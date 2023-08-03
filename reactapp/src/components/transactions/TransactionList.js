import {Badge, Card, Grid, Table, Text} from '@mantine/core';
import {ArrowRIcon ,ArrowGIcon} from "../../assets/assets";
import Edit from '../../assets/Edit.svg'
import {useSelector} from "react-redux";
import TransactionEditForm from "./TransactionEditForm";
import {useState} from "react";

export default function TransactionList() {
    const transactionList = useSelector(state => state.transaction.transactionList)
    const isMobile = useSelector(state => state.user.isMobile)
    const [displayTransactionEditForm,setDisplayTransactionEditForm] = useState(false);
    const [selectedEditElement,setSelectedEditElement] = useState(null);

    function handleTransactionEditFormClose(){
        setDisplayTransactionEditForm(false)
    }
    function handleTransactionEditFormOpen(element){
        setSelectedEditElement(element)
        setDisplayTransactionEditForm(true)
    }
    const dateCol = (date) => {
        const dateTime = new Date(date)
        const dateoptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            isMobile?
                <div>
                    <Text fw={700} fz="md" style={{marginBottom:5}}>{dateTime.toLocaleDateString('en-US',dateoptions)}</Text>
                </div>
                :
            <div>
                <Text fw={700} fz="md" style={{marginBottom:5}}>{dateTime.toLocaleDateString('en-US',dateoptions)}</Text>
                <Text fw={500} c="dimmed" fz="sm">{dateTime.toLocaleTimeString('en-US')}</Text>
            </div>
        )
    }
    const categoryCol = (category) => {
        return ( isMobile ?

                <div>
                    <Grid>
                        <Grid.Col span="content">
                            {category.type === "income" ?
                                <img src={ArrowGIcon}  alt={""}/> : <img src={ArrowRIcon}  alt={""}/>}
                        </Grid.Col>
                        <Grid.Col span="content">
                            {category.type === "income" ?
                                <Text fw={700} fz="md">{<Badge color="green">{category.name}</Badge>}</Text>  : <Text fw={700} fz="md">{<Badge  color="red">{category.name}</Badge>}</Text>}
                        </Grid.Col>
                    </Grid>
                </div>

                     :
           <div>
               <Grid>
                   <Grid.Col span="content">
                       {category.type === "income" ?
                           <ArrowGIcon/> : <ArrowRIcon/>}
                   </Grid.Col>
                   <Grid.Col span="auto">
                       {category.type === "income" ?
                           <Text fw={700} fz="md">Received from: {<Badge color="green">{category.name}</Badge>}</Text>  : <Text fw={700} fz="md">Spent on: {<Badge  color="red">{category.name}</Badge>}</Text>}
                   </Grid.Col>
               </Grid>
           </div>
        )
    }
    const accountDetails = (account, paymentType) => {
        return (
            <div style={{marginBottom:12}}>
                <Text fw={700} fz="md" style={{marginBottom:5}}>{account.name}</Text>
                <Text fw={500} c="dimmed" fz="sm">{paymentType}</Text>
            </div>
        )
    }
    const paytype = (element) => {
        return (
            <div style={{marginBottom:12}}>
                <img src={Edit} onClick={() => handleTransactionEditFormOpen(element)} alt={""}/>
            </div>
        )
    }
    const amountCol = (amount, type) => {
        return (
            <div style={{marginBottom:12}}>
                {type === "income" ?
                
                <Text fw={700} fz="md" style={{marginBottom:12,color: '#26AB35'}}>{"+ Rs. " + amount.toLocaleString("en-US")}</Text> : <Text fw={700} fz="md" style={{marginBottom:12}}>{"- Rs. " + amount.toLocaleString("en-US")}</Text>}
            </div>
        )
    }
    const rows = transactionList.map((element) => {
        const dateTime = new Date(element.dateTime)
        const dateOptions = { month: 'short', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: '2-digit' };
        const cardContent = (
            <div>
                <Grid>
                    <Grid.Col span={3} >
                        <Text fw={500} c="dimmed" fz="md" style={{marginBottom:5}}>{dateTime.toLocaleDateString('en-US',dateOptions)}</Text>
                        <Text fw={500} c="dimmed" fz="sm">{dateTime.toLocaleTimeString('en-US',timeOptions)}</Text>
                    </Grid.Col>
                    <Grid.Col span={6} >
                        <Grid>
                            {element.category.type === "income" ?

                                <Text fw={700} fz="md" style={{marginTop:10,color: '#26AB35'}}>{"+ Rs. " + element.amount.toLocaleString("en-US")}</Text> : <Text style={{marginTop:10}} fw={700} fz="md">{"- Rs. " + element.amount.toLocaleString("en-US")}</Text>}
                        </Grid>
                        <Grid>
                            <Text style={{marginTop:10}} fw={500} c={"dimmed"} fz="md">{element.account.name.length>16 ? `${element.account.name.slice(0,16)}...`:element.account.name}</Text>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <div>
                            {element.category.type === "income" ?
                                <ArrowGIcon/> : <ArrowRIcon/>}
                        </div>
                        <div>
                            {element.category.type === "income" ?
                                <Text fw={700} fz="md">{<Badge size={"xs"} color="green">{element.category.name.length>8 ? `${element.category.name.slice(0,8)}...`:element.category.name}</Badge>}</Text>  : <Text fw={700} fz="md">{<Badge size={"xs"} color="red">{element.category.name.length>8 ? `${element.category.name.slice(0,8)}...`:element.category.name}</Badge>}</Text>}
                        </div>
                    </Grid.Col>
                </Grid>
            </div>
        );

        if (isMobile) {
            return (
                <Card key={element.id} radius="md" p="md" withBorder style={{ marginBottom: 8 }}>
                    {cardContent}
                </Card>
            );
        }

        // For desktop view, render a table row
        return (
            <tr key={element.id}>
                <td>{dateCol(element.dateTime)}</td>
                <td>{categoryCol(element.category)}</td>
                <td>{accountDetails(element.account, element.paymentType)}</td>
                <td>{amountCol(element.amount, element.category.type)}</td>
                <td>{paytype(element)}</td>
            </tr>
        );
    });

    return (
        <div>
            {displayTransactionEditForm && (
                <TransactionEditForm
                    element={selectedEditElement}
                    open={displayTransactionEditForm}
                    close={handleTransactionEditFormClose}
                />
            )}
            {isMobile ? (
                <div>
                    <Text style={{marginBottom:10,marginTop:10}}>Recent Transactions</Text>
                    <div>{rows}</div>
                </div>
            ) : (
                <Table>
                    <thead>
                    <tr>
                        <th>
                            <Text fw={700} c="dimmed">
                                DATE & TIME
                            </Text>
                        </th>
                        <th>
                            <Text fw={700} c="dimmed">
                                TRANSACTION DETAILS
                            </Text>
                        </th>
                        <th>
                            <Text fw={700} c="dimmed">
                                ACCOUNT DETAILS
                            </Text>
                        </th>
                        <th>
                            <Text fw={700} c="dimmed">
                                AMOUNT
                            </Text>
                        </th>
                        <th>
                            <Text c="dimmed">EDIT</Text>
                        </th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            )}
        </div>
    );
}