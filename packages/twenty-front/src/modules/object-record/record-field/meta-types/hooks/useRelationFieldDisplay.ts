import { useContext } from 'react';

import { useRecordFieldValue } from '@/object-record/record-store/contexts/RecordFieldValueSelectorContext';
import { RecordTableContext } from '@/object-record/record-table/contexts/RecordTableContext';
import { FIELD_EDIT_BUTTON_WIDTH } from '@/ui/field/display/constants/FieldEditButtonWidth';
import { FieldMetadataType } from '~/generated-metadata/graphql';
import { isDefined } from '~/utils/isDefined';

import { FieldContext } from '../../contexts/FieldContext';
import { assertFieldMetadata } from '../../types/guards/assertFieldMetadata';
import { isFieldRelation } from '../../types/guards/isFieldRelation';

export const useRelationFieldDisplay = () => {
  const { entityId, fieldDefinition, maxWidth } = useContext(FieldContext);

  assertFieldMetadata(
    FieldMetadataType.Relation,
    isFieldRelation,
    fieldDefinition,
  );

  const button = fieldDefinition.editButtonIcon;

  const fieldName = fieldDefinition.metadata.fieldName;

  const fieldValue = useRecordFieldValue(entityId, fieldName);

  const maxWidthForField =
    isDefined(button) && isDefined(maxWidth)
      ? maxWidth - FIELD_EDIT_BUTTON_WIDTH
      : maxWidth;

  const { recordChipDataGeneratorPerFieldName } =
    useContext(RecordTableContext);

  const generateRecordChipData =
    recordChipDataGeneratorPerFieldName[fieldDefinition.metadata.fieldName];

  return {
    fieldDefinition,
    fieldValue,
    maxWidth: maxWidthForField,
    entityId,
    generateRecordChipData,
  };
};