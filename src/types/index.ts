// Account Type Enum
export enum AccountType {
    SAVINGS = 'SAVINGS',
    CURRENT = 'CURRENT'
}

// Transaction Type Enum
export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    TRANSFER_IN = 'TRANSFER_IN',
    TRANSFER_OUT = 'TRANSFER_OUT'
}

// Transaction Interface
export interface ITransaction {
    id: string;
    accountId: string;
    type: TransactionType;
    amount: number;
    description: string;
    relatedAccountId?: string;
    timestamp: Date;
}

// Account Interface
export interface IAccount {
    id: string;
    accountHolderName: string;
    email: string;
    balance: number;
    accountType: AccountType;
    transactions: ITransaction[];
    createdAt: Date;
    updatedAt: Date;
}

// Create Account DTO
export interface ICreateAccountDTO {
    accountHolderName: string;
    email: string;
    balance: number;
    accountType: AccountType;
}

// Update Account DTO
export interface IUpdateAccountDTO {
    accountHolderName?: string;
    email?: string;
    balance?: number;
    accountType?: AccountType;
}

// Deposit DTO
export interface IDepositDTO {
    amount: number;
    description?: string;
}

// Withdraw DTO
export interface IWithdrawDTO {
    amount: number;
    description?: string;
}

// Transfer DTO
export interface ITransferDTO {
    toAccountId: string;
    amount: number;
    description?: string;
}

