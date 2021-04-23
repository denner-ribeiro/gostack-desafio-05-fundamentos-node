import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // Pesquisa se o tipo está contido nas opções do vetor e retorna true ou false
    if (!['income', 'outcome'].includes(type)) throw Error('Transaction type is not valid!');

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) throw Error('The outcome cannot be greater than income!')

    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;
  }
}

export default CreateTransactionService;
