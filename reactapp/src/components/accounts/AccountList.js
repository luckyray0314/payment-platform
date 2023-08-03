
import {Text, Table, Card, Grid, Badge} from '@mantine/core';
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import {useSelector} from "react-redux";
import {useState} from "react";
import AccountEditForm from "./AccountEditForm";
export default function AccountList() {
    const accountList = useSelector(state => state.account.accountList)
    const isMobile = useSelector(state => state.user.isMobile)
    const [displayAccountEditForm,setDisplayAccountEditForm] = useState(false);
    const [selectedEditElement,setSelectedEditElement] = useState(null);
    function handleEdit(element){
        setSelectedEditElement(element)
        setDisplayAccountEditForm(true)
    }

    function handleAccountEditFormClose(){
        setDisplayAccountEditForm(false)
    }

    const rows = accountList.map((element) => {
        const cardContent = (
            <div>
                <Badge size={"xl"} radius="md" variant="dot">{element.name}</Badge>
                <Grid style={{margin:1}}>
                    <Grid.Col span={4}>
                        <Text fw={500}>Total Inc.</Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text  fw={700}>:</Text>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Text  fw={700}>Rs. {element.totalIncome.toLocaleString('en-US')}</Text>
                    </Grid.Col>
                </Grid>
                <Grid style={{margin:1}}>
                    <Grid.Col span={4}>
                        <Text fw={500}>Total Exp.</Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text  fw={700}>:</Text>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Text  fw={700}>Rs. {element.totalExpenses.toLocaleString('en-US')}</Text>
                    </Grid.Col>
                </Grid>
                <Grid style={{margin:1}}>
                    <Grid.Col span={4}>
                        <Text fw={500}>Current Bal.</Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text  fw={700}>:</Text>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Text style={{ color: '#26AB35' }} fw={700}>Rs. {element.currentBalance.toLocaleString('en-US')}</Text>
                    </Grid.Col>
                </Grid>
            </div>
        );

        if (isMobile) {
            return (
                <Card key={element.accountId} radius="md" p="md" withBorder style={{ marginBottom: 8 }}>
                    {cardContent}
                </Card>
            );
        }

        // For desktop view, render a table row
        return (
            <tr key={element.accountId}>
                <td>
                    <Text fw={700}>{element.name}</Text>
                </td>
                <td>
                    <Text fw={700}>{`Rs. ${element.totalIncome.toLocaleString('en-US')}`}</Text>
                </td>
                <td>
                    <Text fw={700}>{`Rs. ${element.totalExpenses.toLocaleString('en-US')}`}</Text>
                </td>
                <td>
                    <Text fw={700} style={{ color: '#26AB35' }}>
                        {`Rs. ${element.currentBalance.toLocaleString('en-US')}`}
                    </Text>
                </td>
                <td>{<EditSVG onClick={() => handleEdit(element)} />}</td>
            </tr>
        );
    });

    return (
        <div>
            {displayAccountEditForm && (
                <AccountEditForm
                    element={selectedEditElement}
                    open={displayAccountEditForm}
                    close={handleAccountEditFormClose}
                />
            )}
            {isMobile ? (
                <div>
                    <Text style={{marginBottom:20,marginTop:20}}>Your Accounts</Text>
                    <div>{rows}</div>
                </div>
            ) : (
                <Table verticalSpacing="lg">
                    <thead>
                    <tr>
                        <th>
                            <Text c="dimmed">ACCOUNT DETAILS</Text>
                        </th>
                        <th>
                            <Text c="dimmed">TOTAL INCOME</Text>
                        </th>
                        <th>
                            <Text c="dimmed">TOTAL EXPENSES</Text>
                        </th>
                        <th>
                            <Text c="dimmed">CURRENT BALANCE</Text>
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