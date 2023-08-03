import {useEffect, useState} from "react";
import {Table, Progress, Text, Grid, Card, Badge} from "@mantine/core";
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
                <Badge size={"xl"} radius="md" variant="dot">{element.category.name}</Badge>
                <Grid style={{margin:1}}>
                    <Grid.Col span={4}>
                        <Text fw={500}>Budget</Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text  fw={700}>:</Text>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Text  fw={700}>Rs. {element.amount.toLocaleString('en-US')}</Text>
                    </Grid.Col>
                </Grid>
                <Grid style={{margin:1}}>
                    <Grid.Col span={4}>
                        <Text fw={500}>Used Amt.</Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text  fw={700}>:</Text>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Text  fw={700}>Rs. {element.used.toLocaleString('en-US')}</Text>
                    </Grid.Col>
                </Grid>
                <Grid style={{margin:1}}>
                    <Grid.Col span={4}>
                        <Text fw={500}>Bal Left</Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Text  fw={700}>:</Text>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Text style={{color: '#26AB35'}} fw={700}>Rs. {element.balance.toLocaleString('en-US')}</Text>
                    </Grid.Col>
                </Grid>
                <Grid style={{margin:1}}>
                    <Grid.Col span="auto">
                        <Progress
                            tooltip={(100 * element.used) / element.amount}
                            style={{ marginTop: 5}}
                            label={`${Math.floor((100 * element.used) / element.amount)}%`}
                            value={(100 * element.used) / element.amount}
                            radius="xl"
                            size="xl"
                        />
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
                    <Text style={{marginBottom:20,marginTop:20}}>This Month Usage</Text>
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