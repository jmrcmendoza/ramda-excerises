import {
  MemberFields,
  PromoDocument,
  PromoStatus,
  PromoTemplate,
} from '../../models/promo';

export default function () {
  return async function makeVendor(
    promo: PromoDocument,
  ): Promise<void | Error> {
    const {
      name,
      template,
      title,
      description,
      status,
      minimumBalance,
      requiredMemberFields,
    } = promo;

    if (!name) {
      throw new Error('Promo name must be provided.');
    }
    if (!template) {
      throw new Error('Template must be provided.');
    }
    if (!Object.values(PromoTemplate).includes(template)) {
      throw new Error('Invalid template.');
    }
    if (!title) {
      throw new Error('Promo title must be provided');
    }
    if (!description) {
      throw new Error('Description must be provided.');
    }
    if (status && !Object.values(PromoStatus).includes(status)) {
      throw new Error('Invalid status.');
    }

    if (template === PromoTemplate.Deposit && !minimumBalance) {
      throw new Error('Minimum balance must be provided.');
    }
    if (template === PromoTemplate.SignUp) {
      if (!requiredMemberFields || requiredMemberFields.length < 1) {
        throw new Error('Members fields must be provided.');
      }

      const invalidField = requiredMemberFields.find(
        (field) => !Object.values(MemberFields).includes(field),
      );

      if (invalidField) {
        throw new Error(`${invalidField} is an invalid field.`);
      }
    }
  };
}
