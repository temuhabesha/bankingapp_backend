const db_connection = require('../config/db')

async function transfer(req,res) {

    const {senders_account,recivers_account,amount} = req.body;

    if(!senders_account || !recivers_account || !amount){
        res.status(401).json({msg:"please enter all required fields"})
    }

    try {
        await db_connection.beginTransaction();
        //check sender's balance
        const [sender] = await db_connection.query('SELECT balance FROM accounts WHERE id=?',[senders_account])
        if(!sender.length || sender[0].balance < amount){
            return res.send('insufficient mony or invalid sender account')
        }

        // deduct amount from sender
        await db_connection.query('UPDATE accounts SET balance = balance - ? WHERE id = ?' ,[amount,senders_account])

        // add amount to receiver
        const [receiver] = await db_connection.query('SELECT balance FROM accounts WHERE id = ?', [recivers_account])

        if(!receiver.length){
            return res.send('invalid receiver account')
        }
       
        await db_connection.query('UPDATE accounts SET balance = balance + ? WHERE id =?',[amount,recivers_account])


        // log the transaction

        await db_connection.query('INSERT INTO transactions (sender_id,receiver_id,amount) VALUES (?,?,?)',[senders_account,recivers_account,amount]);



        //commit the transaction

        await db_connection.commit();

        res.status(200).json({msg:"transaction successful!"});

    } catch (error) {
        await db_connection.rollback();

        res.status(400).json({error:error.message});
    }
}

module.exports = transfer;