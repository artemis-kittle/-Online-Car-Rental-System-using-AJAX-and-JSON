const{
    createPool
}= require ('mysql');

const pool  = createPool({
    host: "localhost",
    user: "root",
    password: "qwerty123",
    database: "utshertz",
    connectionLimit: 10
})

$sql="CREATE TABLE Renting_History ( id INT AUTO_INCREMENT PRIMARY KEY, user_email VARCHAR(255), rent_date DATE, bond_amount DECIMAL(10,2));"

