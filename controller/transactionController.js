const mysql = require("mysql2/promise");
const db_connection = require("../config/db");

async function transfer(req, res) {
  const { senders_account, recivers_account, amount } = req.body;

  // Validate inputs
  if (!senders_account || !recivers_account || !amount || amount <= 0) {
    return res.status(422).json({ msg: "Please provide valid inputs." });
  }
  try {
    await db_connection.beginTransaction();
    // Check sender's balance
    const [sender] = await db_connection.query(
      "SELECT balance FROM accounts WHERE acount_number = ?",
      [senders_account]
    );
    if (!sender.length || sender[0].balance < amount) {
        await db_connection.rollback();
      return res
        .status(400)
        .json({ msg: "Insufficient mony or invalid sender account." });
    }
    // Deduct amount from sender
    await db_connection.query(
      "UPDATE accounts SET balance = balance - ? WHERE acount_number = ?",
      [amount, senders_account]
    );
    // Check receiver's account

    const [receiver] = await db_connection.query(
      "SELECT balance FROM accounts WHERE acount_number = ?",
      [recivers_account]
    );
    if (!receiver.length) {
        await db_connection.rollback()
      return res.status(404).json({ msg: "Invalid receiver account." });
    }
    // Add amount to receiver
    await db_connection.query(
      "UPDATE accounts SET balance = balance + ? WHERE acount_number = ?",
      [amount, recivers_account]
    );

    // Log the transaction
    await db_connection.query(
      "INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)",
      [senders_account, recivers_account, amount]
    );
    // Commit the transaction
    await db_connection.commit();
    return res.status(200).json({ msg: "Transaction successful!" });
  } catch (error) {
   await db_connection.rollback();
   console.log('transaction faild:',error)
    return res.status(400).json({msg:error.message})
  } 
}

async function save(req, res) {
  const { account, ammount } = req.body;
  if (!account || !ammount) {
    return res.status(400).json({ msg: "please fullfill all required fields" });
  }
  db_connection.beginTransaction();
  try {
    const [user] = await db_connection.query(
      "select username from accounts where acount_number = ?",
      [account]
    );

    if (!user) {
      return res.status(400).json({ msg: "the account is invalid" });
    }
    await db_connection.query(
      "update accounts set balance = balance + ? where acount_number = ?",
      [ammount, account]
    );
    db_connection.commit();
    return res
      .status(200)
      .json({ msg: "the mony is saved in your account successfully" });
  } catch (error) {
    db_connection.rollback();
    return res.status(500).json({ msg: "error" });
  }
}

module.exports = { transfer, save };
