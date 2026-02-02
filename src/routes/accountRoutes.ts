import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';

const router = Router();
const accountController = new AccountController();

/**
 * Account Routes
 */

// Create account
router.post('/', accountController.createAccount);

// Get all accounts
router.get('/', accountController.getAllAccounts);

// Get account by ID
router.get('/:id', accountController.getAccountById);

// Update account
router.put('/:id', accountController.updateAccount);

// Delete account
router.delete('/:id', accountController.deleteAccount);

// Deposit funds
router.post('/:id/deposit', accountController.deposit);

// Withdraw funds
router.post('/:id/withdraw', accountController.withdraw);

// Transfer funds
router.post('/:id/transfer', accountController.transfer);

// Get transaction history
router.get('/:id/history', accountController.getHistory);

export default router;

