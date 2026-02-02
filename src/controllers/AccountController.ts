import { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';
import {
    ICreateAccountDTO,
    IUpdateAccountDTO,
    IDepositDTO,
    IWithdrawDTO,
    ITransferDTO
} from '../types';

/**
 * AccountController - Handles HTTP requests for accounts
 */
export class AccountController {
    private accountService: AccountService;

    constructor() {
        this.accountService = new AccountService();
    }

    /**
     * Create a new account
     * POST /api/accounts
     */
    public createAccount = (req: Request, res: Response): void => {
        try {
            const data: ICreateAccountDTO = req.body;
            const account = this.accountService.createAccount(data);
            res.status(201).json({
                success: true,
                message: 'Account created successfully',
                data: account.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create account'
            });
        }
    };

    /**
     * Get all accounts
     * GET /api/accounts
     */
    public getAllAccounts = (_req: Request, res: Response): void => {
        try {
            const accounts = this.accountService.getAllAccounts();
            res.status(200).json({
                success: true,
                count: accounts.length,
                data: accounts.map(acc => acc.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to fetch accounts'
            });
        }
    };

    /**
     * Get account by ID
     * GET /api/accounts/:id
     */
    public getAccountById = (req: Request, res: Response): void => {
        try {
            const { id } = req.params;
            const account = this.accountService.getAccountById(id);
            res.status(200).json({
                success: true,
                data: account.toJSON()
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error instanceof Error ? error.message : 'Account not found'
            });
        }
    };

    /**
     * Update account
     * PUT /api/accounts/:id
     */
    public updateAccount = (req: Request, res: Response): void => {
        try {
            const { id } = req.params;
            const data: IUpdateAccountDTO = req.body;
            const account = this.accountService.updateAccount(id, data);
            res.status(200).json({
                success: true,
                message: 'Account updated successfully',
                data: account.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to update account'
            });
        }
    };

    /**
     * Delete account
     * DELETE /api/accounts/:id
     */
    public deleteAccount = (req: Request, res: Response): void => {
        try {
            const { id } = req.params;
            this.accountService.deleteAccount(id);
            res.status(200).json({
                success: true,
                message: 'Account deleted successfully'
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to delete account'
            });
        }
    };

    /**
     * Deposit funds
     * POST /api/accounts/:id/deposit
     */
    public deposit = (req: Request, res: Response): void => {
        try {
            const { id } = req.params;
            const data: IDepositDTO = req.body;
            const account = this.accountService.deposit(id, data);
            res.status(200).json({
                success: true,
                message: `Successfully deposited ${data.amount}`,
                data: account.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to deposit funds'
            });
        }
    };

    /**
     * Withdraw funds
     * POST /api/accounts/:id/withdraw
     */
    public withdraw = (req: Request, res: Response): void => {
        try {
            const { id } = req.params;
            const data: IWithdrawDTO = req.body;
            const account = this.accountService.withdraw(id, data);
            res.status(200).json({
                success: true,
                message: `Successfully withdrew ${data.amount}`,
                data: account.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to withdraw funds'
            });
        }
    };

    /**
     * Transfer funds
     * POST /api/accounts/:id/transfer
     */
    public transfer = (req: Request, res: Response): void => {
        try {
            const { id } = req.params;
            const data: ITransferDTO = req.body;
            const result = this.accountService.transfer(id, data);
            res.status(200).json({
                success: true,
                message: `Successfully transferred ${data.amount} to account ${data.toAccountId}`,
                data: {
                    fromAccount: result.fromAccount.toJSON(),
                    toAccount: result.toAccount.toJSON()
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to transfer funds'
            });
        }
    };

    /**
     * Get transaction history
     * GET /api/accounts/:id/history
     */
    public getHistory = (req: Request, res: Response): void => {
        try {
            const { id } = req.params;
            const history = this.accountService.getTransactionHistory(id);
            res.status(200).json({
                success: true,
                count: history.length,
                data: history
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to fetch history'
            });
        }
    };
}

