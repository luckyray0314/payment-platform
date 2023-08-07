import {useEffect, useState} from "react";
import {Table, Progress, Text, Grid, Card, Badge, Avatar} from "@mantine/core";
import {ReactComponent as EditSVG} from '../../assets/Edit.svg';
import {useDispatch, useSelector} from "react-redux";
import {fetchBudget} from "../../features/budgetSlice";
import BudgetEditForm from "./BudgetEditForm";


export default function BudgetList() {
    const dispatch = useDispatch()
    const [displayBudgetEditForm, setDisplayBudgetEditForm] = useState(false);
    const isMobile = useSelector(state => state.user.isMobile)
    const [selectedEditElement, setSelectedEditElement] = useState(null);
    const token = useSelector(state => state.user.token)
    useEffect(() => {
        dispatch(fetchBudget({token: token}))
    }, [dispatch, token])

    function handleBudgetEditFormClose() {
        setDisplayBudgetEditForm(false)
    }

    function handleBudgetEditFormOpen(element) {
        setSelectedEditElement(element)
        setDisplayBudgetEditForm(true)
    }

    const budgetList = useSelector(state => state.budget.budgetList)
    const rows = budgetList.map((element) => {
        const cardContent = (
            <div>
                <Grid>
                    <Grid.Col span={2} >
                        <Avatar color="blue" radius="xl">{element.category.name.slice(0,2).toUpperCase()}</Avatar>
                    </Grid.Col>
                    <Grid.Col span={10} >
                        <Text fw={"600"} style={{marginBottom:8}} fz={"sm"}>{`${element.category.name} (${Math.floor((100 * element.used) / element.amount)}%)`}</Text>
                        <Progress
                            tooltip={(100 * element.used) / element.amount}
                            style={{ marginTop: 5}}
                            value={(100 * element.used) / element.amount}
                            radius="xl"
                            size="sm"
                        />
                        <Text style={{marginTop:8,fontSize:10}}>{`Balance left to spend  Rs. ${element.balance.toLocaleString('en-US')} in Rs. ${element.amount.toLocaleString('en-US')}`}</Text>
                    </Grid.Col>
                </Grid>
            </div>
        );

        if (isMobile) {
            return (
                <Card key={element.budgetId} radius="md" p="md" withBorder style={{ marginBottom: 8 }}>
                    {cardContent}
                </Card>
            );
        }

        // For desktop view, render a table row
        return (
            <tr key={element.budgetId}>
                <td>
                    <Text fw={700}>{element.category.name}</Text>
                </td>
                <td>
                    <Text fw={700}>{`Rs. ${element.amount.toLocaleString('en-US')}`}</Text>
                </td>
                <td>
                    <Grid>
                        <Grid.Col span="content">
                            <Text fw={700}>{`Rs. ${element.used.toLocaleString('en-US')}`}</Text>
                        </Grid.Col>
                        <Grid.Col span="auto">
                            <Progress
                                tooltip={(100 * element.used) / element.amount}
                                style={{height: 9, marginTop: 5}}
                                value={(100 * element.used) / element.amount}
                                radius="xl"
                            />
                        </Grid.Col>
                    </Grid>
                </td>
                <td>
                    <Text fw={700} style={{color: '#26AB35'}}>
                        {`Rs. ${element.balance.toLocaleString('en-US')}`}
                    </Text>
                </td>
                <td>{<EditSVG onClick={() => handleBudgetEditFormOpen(element)}></EditSVG>}</td>
            </tr>
        );
    });

    return (
        <div>
            {displayBudgetEditForm && (
                <BudgetEditForm
                    element={selectedEditElement}
                    open={displayBudgetEditForm}
                    close={handleBudgetEditFormClose}
                />
            )}
            {isMobile ? (
                <div>
                    <Text fw={"700"} style={{marginBottom:3,marginTop:28}}>This month</Text>
                    <Text fz={"xs"} style={{marginBottom:10}}>All your Budget spending based on this month</Text>
                    <div>{rows}</div>
                </div>
            ) : (
                <Table verticalSpacing="md">
                    <thead>
                    <tr>
                        <th>
                            <Text c="dimmed">CATEGORY</Text>
                        </th>
                        <th>
                            <Text c="dimmed">BUDGET</Text>
                        </th>
                        <th>
                            <Text c="dimmed">USED AMOUNT</Text>
                        </th>
                        <th>
                            <Text c="dimmed">BALANCE LEFT</Text>
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