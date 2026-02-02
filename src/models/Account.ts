import { v4 as uuidv4 } from 'uuid';
import { IAccount, ICreateAccountDTO, IUpdateAccountDTO, AccountType, ITransaction } from '../types';

/**
 * Account Model Class
 */
export class Account implements IAccount {
    public id: string;
    public accountHolderName: string;
    public email: string;
    public balance: number;
    public accountType: AccountType;
    public transactions: ITransaction[];
    public createdAt: Date;
    public updatedAt: Date;

    constructor(data: ICreateAccountDTO) {
        this.id = uuidv4();
        this.accountHolderName = data.accountHolderName;
        this.email = data.email;
        this.balance = data.balance;
        this.accountType = data.accountType;
        this.transactions = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * Update account details
     */
    public update(data: IUpdateAccountDTO): void {
        if (data.accountHolderName) this.accountHolderName = data.accountHolderName;
        if (data.email) this.email = data.email;
        if (data.balance !== undefined) this.balance = data.balance;
        if (data.accountType) this.accountType = data.accountType;
        this.updatedAt = new Date();
    }

    /**
     * Add a transaction to the history
     */
    public addTransaction(transaction: ITransaction): void {
        this.transactions.push(transaction);

        // Update balance based on transaction type
        // Note: The logic for balance update should ideally be in the service
        // but adding it here for consistency if balance is directly updated.
        // However, we'll let the service handle the balance logic.
    }

    /**
     * Convert to plain object
     */
    public toJSON(): IAccount {
        return {
            id: this.id,
            accountHolderName: this.accountHolderName,
            email: this.email,
            balance: this.balance,
            accountType: this.accountType,
            transactions: this.transactions,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

