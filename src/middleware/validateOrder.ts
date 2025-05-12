import { Request, Response, NextFunction } from 'express';

export function validateOrder(req: Request, res: Response, next: NextFunction): void {
  const { type, totalAmount, portfolio } = req.body;

    // If the body is completely missing or empty
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: 'Request body is missing or empty.' });
      return;
    }

  // Validate type
  if (!type || !['BUY', 'SELL'].includes(type)) {
    res.status(400).json({ error: 'Order type must be provided and must be either "BUY" or "SELL".' });
    return;
  }

  // Validate totalAmount
  if (typeof totalAmount !== 'number' || totalAmount <= 0) {
    res.status(400).json({ error: 'Total amount is required and must be a positive number.' });
    return;
  }

  // Validate portfolio
  if (!Array.isArray(portfolio) || portfolio.length === 0) {
    res.status(400).json({ error: 'Portfolio must be a non-empty array.' });
    return;
  }

  let totalAllocation = 0;

  for (const stock of portfolio) {
    if (
      !stock.symbol ||
      typeof stock.symbol !== 'string' ||
      stock.symbol.trim().length === 0
    ) {
      res.status(400).json({ error: 'Each stock must have a valid non-empty "symbol".' });
      return;
    }

    if (
      typeof stock.allocation !== 'number' ||
      stock.allocation < 0 ||
      stock.allocation > 100
    ) {
      res.status(400).json({ error: 'Each stock must have a valid "allocation" between 0 and 100.' });
      return;
    }

    if ('price' in stock && (typeof stock.price !== 'number' || stock.price <= 0)) {
      res.status(400).json({ error: 'If provided, "price" must be a positive number.' });
      return;
    }

    totalAllocation += stock.allocation;
  }

  if (Math.round(totalAllocation) !== 100) {
    res.status(400).json({ error: 'Total allocation across all stocks must equal 100%.' });
    return;
  }

  next(); // Valid input
}
