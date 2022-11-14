export interface ModalState {
  type: ModalTypes | null;
}

export enum ModalTypes {
  UPGRADE_TO_PRO = 'UPGRADE_TO_PRO',
  UPGRADE_TO_PRO_PAYMENT = 'UPGRADE_TO_PRO_PAYMENT',
}
