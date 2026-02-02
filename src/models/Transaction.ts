import { v4 as uuidv4 } from 'uuid';
import { ITransaction, TransactionType } from '../types';

/**
 * Transaction Model Class
 */
export class Transaction implements ITransaction {
    public id: string;
    public accountId: string;
    public type: TransactionType;
    public amount: number;
    public description: string;
    public relatedAccountId?: string;
    public timestamp: Date;

    constructor(
        accountId: string,
        type: TransactionType,
        amount: number,
        description: string,
        relatedAccountId?: string
    ) {
        this.id = uuidv4();
        this.accountId = accountId;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.relatedAccountId = relatedAccountId;
        this.timestamp = new Date();
    }

    /**
     * Convert to plain object
     */
    public toJSON(): ITransaction {
        return {
            id: this.id,
            accountId: this.accountId,
            type: this.type,
            amount: this.amount,
            description: this.description,
            relatedAccountId: this.relatedAccountId,
            timestamp: this.timestamp
        };
    }
}
