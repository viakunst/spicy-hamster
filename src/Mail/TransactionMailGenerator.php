<?php

namespace App\Mail;

use App\Entity\Person\Person;
use App\Entity\Transaction\Transaction;
use Psr\Log\LoggerInterface;
use Twig\Environment;

/**
 * This class will generate the email for every Transactions.
 */
class TransactionMailGenerator
{
    private Environment $twig;

    private LoggerInterface $logger;

    public function __construct(Environment $twig, LoggerInterface $logger)
    {
        $this->twig = $twig;
        $this->logger = $logger;
    }

    /**
     * @param array<Transaction> $transactions
     */
    public function generateBaseEmail(Person $person, $transactions): string
    {
        $this->logger->debug('Generating emails');

        // Sanity check. ONLY transaction assoc to the person allowed.
        $transactions = array_filter(
            $transactions,
            function ($var) use ($person) {
                if (null !== $var->getPerson()) {
                    return $var->getPerson()->getId() == $person->getId();
                }

                return false;
            }
        );

        //  Sanity check. ONLY transactions with unpaid status.
        $transactions = array_filter(
            $transactions,
            function ($var) {
                return Transaction::OUTSTANDING == $var->getStatus();
            }
        );

        // get the bankaccounts of the transaction array.
        $bankAccounts = [];
        foreach ($transactions as $transaction) {
            if (null !== $transaction->getBankAccount()) {
                if (!array_key_exists($transaction->getBankAccount()->getId(), $bankAccounts)) {
                    $bankAccounts[$transaction->getBankAccount()->getId()] = $transaction->getBankAccount();
                }
            }
        }

        // sort the transactions by the bankaccount.
        $transactionsByAccount = [];
        foreach ($bankAccounts as $account) {
            $filteredTransactions = array_filter(
                $transactions,
                function ($var) use ($account) {
                    if (null !== $var->getBankAccount()) {
                        return $var->getBankAccount()->getId() == $account->getId();
                    }

                    return false;
                }
            );

            array_push($transactionsByAccount,
                [
                    'account' => $account,
                    'transaction' => $filteredTransactions,
                ]
            );
        }

        $htmlContents = $this->twig->render('email/reminderEmail.html.twig', [
            'person' => $person,
            'transactionsByAccount' => $transactionsByAccount,
        ]);

        return $htmlContents;
    }
}
