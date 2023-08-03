import { Title, Button, Grid, TextInput } from '@mantine/core';
import { ReactComponent as SearchIcon } from '../../assets/Search.svg'
import {useDispatch, useSelector} from "react-redux";
import { showTransactionForm} from "../../features/transactionSlice";

export default function TransactionHeader() {
    const dispatch = useDispatch()
    const isMobile = useSelector(state => state.user.isMobile)
    console.log(isMobile,"isMobile")
    return (
        <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={12} md={6}>
                    <Grid>
                        <Grid.Col span={"content"} md={"content"}>
                            {isMobile ? <Title style={{ margin: 5 }} order={2}>Transactions</Title> : <Title style={{ margin: 5 }} order={2}>Transactions</Title>}
                        </Grid.Col>
                        <Grid.Col span={"content"} >
                            {isMobile ?
                                <Button  radius="md"  style={{ margin: 8 }} onClick={() => dispatch(showTransactionForm())}>Add Trans</Button>

                                : <Button radius="md"  style={{ margin: 8 }} onClick={() => dispatch(showTransactionForm())}>Add Transactions</Button>}
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={12}  md={6}>
                    <TextInput
                        style={{ margin: 8 }}
                        icon={<SearchIcon />}
                        radius="md"
                        placeholder="Search..."
                        value={''}
                    />
                </Grid.Col>
            </Grid>
        </div >
    )
}