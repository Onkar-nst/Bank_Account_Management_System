import { Account } from '../models/Account';
import { Transaction } from '../models/Transaction';
import {
    ICreateAccountDTO,
    IUpdateAccountDTO,
    IDepositDTO,
    IWithdrawDTO,
    ITransferDTO,
    TransactionType,
    ITransaction
} from '../types';

/**
 * AccountService - Handles all business logic for accounts
 */
export class AccountService {
    private accounts: Map<string, Account>;

    constructor() {
        this.accounts = new Map();
    }

    /**
     * Create a new account
     */
    public createAccount(data: ICreateAccountDTO): Account {
        // Validate email uniqueness
        const existingAccount = Array.from(this.accounts.values()).find(
            acc => acc.email === data.email
        );

        if (existingAccount) {
            throw new Error('Account with this email already exists');
        }

        const account = new Account(data);
        this.accounts.set(account.id, account);
        return account;
    }

    /**
     * Get account by ID
     */
    public getAccountById(id: string): Account {
        const account = this.accounts.get(id);
        if (!account) {
            throw new Error('Account not found');
        }
        return account;
    }

    /**
     * Get all accounts
     */
    public getAllAccounts(): Account[] {
        return Array.from(this.accounts.values());
    }

    /**
     * Update account
     */
    public updateAccount(id: string, data: IUpdateAccountDTO): Account {
        const account = this.getAccountById(id);

        // Check email uniqueness if email is being updated
        if (data.email && data.email !== account.email) {
            const existingAccount = Array.from(this.accounts.values()).find(
                acc => acc.email === data.email
            );
            if (existingAccount) {
                throw new Error('Email already in use by another account');
            }
        }

        account.update(data);
        return account;
    }

    /**
     * Delete account
     */
    public deleteAccount(id: string): void {
        const account = this.getAccountById(id);
        this.accounts.delete(account.id);
    }

    /**
     * Deposit funds
     */
    public deposit(id: string, data: IDepositDTO): Account {
        const account = this.getAccountById(id);

        if (data.amount <= 0) {
            throw new Error('Deposit amount must be greater than zero');
        }

        account.balance += data.amount;

        const transaction = new Transaction(
            account.id,
            TransactionType.DEPOSIT,
            data.amount,
            data.description || 'Cash Deposit'
        );

        account.addTransaction(transaction);
        account.updatedAt = new Date();

        return account;
    }

    /**
     * Withdraw funds
     */
    public withdraw(id: string, data: IWithdrawDTO): Account {
        const account = this.getAccountById(id);

        if (data.amount <= 0) {
            throw new Error('Withdrawal amount must be greater than zero');
        }

        if (account.balance < data.amount) {
            throw new Error('Insufficient balance');
        }

        account.balance -= data.amount;

        const transaction = new Transaction(
            account.id,
            TransactionType.WITHDRAWAL,
            data.amount,
            data.description || 'Cash Withdrawal'
        );

        account.addTransaction(transaction);
        account.updatedAt = new Date();

        return account;
    }

    /**
     * Transfer funds
     */
    public transfer(fromId: string, data: ITransferDTO): { fromAccount: Account; toAccount: Account } {
        const fromAccount = this.getAccountById(fromId);
        const toAccount = this.getAccountById(data.toAccountId);

        if (fromAccount.id === toAccount.id) {
            throw new Error('Cannot transfer to the same account');
        }

        if (data.amount <= 0) {
            throw new Error('Transfer amount must be greater than zero');
        }

        if (fromAccount.balance < data.amount) {
            throw new Error('Insufficient balance for transfer');
        }

        // Perform transfer
        fromAccount.balance -= data.amount;
        toAccount.balance += data.amount;

        // Record transactions
        const outTransaction = new Transaction(
            fromAccount.id,
            TransactionType.TRANSFER_OUT,
            data.amount,
            data.description || `Transfer to ${toAccount.accountHolderName}`,
            toAccount.id
        );

        const inTransaction = new Transaction(
            toAccount.id,
            TransactionType.TRANSFER_IN,
            data.amount,
            data.description || `Transfer from ${fromAccount.accountHolderName}`,
            fromAccount.id
        );

        fromAccount.addTransaction(outTransaction);
        toAccount.addTransaction(inTransaction);

        fromAccount.updatedAt = new Date();
        toAccount.updatedAt = new Date();

        return { fromAccount, toAccount };
    }

    /**
     * Get transaction history
     */
    public getTransactionHistory(id: string): ITransaction[] {
        const account = this.getAccountById(id);
        return account.transactions;
    }
}

