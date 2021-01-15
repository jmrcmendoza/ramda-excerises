import { PromoDocument, Status, Template } from '../../models/promo';

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
    if (!Object.values(Template).includes(template)) {
      throw new Error('Invalid template.');
    }
    if (!title) {
      throw new Error('Promo title must be provided');
    }
    if (!description) {
      throw new Error('Description must be provided.');
    }
    if (!status) {
      throw new Error('Status must be provided.');
    }
    if (!Object.values(Status).includes(status)) {
      throw new Error('Invalid status.');
    }

    if (template === Template.Deposit && !minimumBalance) {
      throw new Error('Minimum balance must be provided.');
    }
    if (template === Template.SignUp) {
      if (!requiredMemberFields || requiredMemberFields.length < 1) {
        throw new Error('Members must be provided.');
      }
    }
  };
}
