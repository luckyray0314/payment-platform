import { Title, Button, Grid, TextInput } from '@mantine/core';
import { ReactComponent as FilterIcon } from '../../assets/Filter_alt.svg'
import { ReactComponent as SearchIcon } from '../../assets/Search.svg'
import {useDispatch} from "react-redux";
import { showTransactionForm} from "../../features/transactionSlice";

export default function TransactionHeader() {
    const dispatch = useDispatch()

    return (
        <div style={{marginBottom:10}}>
            <Grid justify="space-around">
                <Grid.Col md={6} lg={6}>
                    <Grid>
                        <Grid.Col span={"content"}>
                            <Title style={{ margin: 5 }} order={2}>Transactions</Title>
                        </Grid.Col>
                        <Grid.Col span={"content"}>
                            <Button radius="md" fullWidth style={{ margin: 8 }} onClick={() => dispatch(showTransactionForm())}>Add Transactions</Button>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col md={6} lg={6}>
                    <Grid>
                        <Grid.Col md={12} lg={8}>
                            <TextInput
                                style={{ margin: 8 }}
                                icon={<SearchIcon />}
                                radius="md"
                                placeholder="Search..."
                                value={''}
                            />
                        </Grid.Col>
                        <Grid.Col md={12} lg={4}>
                            <Button radius="md" style={{ margin: 8 }} leftIcon={<FilterIcon />} variant="outline" color='gray'>Filter</Button>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </div >
    )
}