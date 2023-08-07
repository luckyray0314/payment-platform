import { Title, Button, Grid, TextInput } from '@mantine/core';
import { ReactComponent as SearchIcon } from '../../assets/Search.svg'
import { ReactComponent as AddIconBlue } from '../../assets/Add_round_Blue.svg'
import { ReactComponent as SearchIconBlue } from '../../assets/Search_Blue.svg'
import { ReactComponent as FilterIconBlue } from '../../assets/Filter_Blue.svg'
import {useDispatch, useSelector} from "react-redux";
import { showTransactionForm} from "../../features/transactionSlice";

export default function TransactionHeader() {
    const dispatch = useDispatch()
    const isMobile = useSelector(state => state.user.isMobile)
    console.log(isMobile,"isMobile")
    return (
        <div style={{marginBottom:10}}>
            {isMobile ?
                <Grid>
                    <Grid.Col span={"content"} >
                        <Title style={{ margin: 5 }} order={3}>Transactions</Title>
                    </Grid.Col>
                    <Grid.Col span={"content"} style={{ marginLeft: 'auto' }}>
                        <AddIconBlue style={{ margin: 8 }} onClick={() => dispatch(showTransactionForm())}></AddIconBlue>
                        <SearchIconBlue style={{ margin: 8 }}></SearchIconBlue>
                        <FilterIconBlue style={{ margin: 8 }}></FilterIconBlue>
                    </Grid.Col>
                </Grid>
                :
                <Grid>
                    <Grid.Col span={12} md={6}>
                        <Grid>
                            <Grid.Col span={"content"} md={"content"}>
                                <Title style={{ margin: 5 }} order={2}>Transactions</Title>
                            </Grid.Col>
                            <Grid.Col span={"content"} >
                                <Button radius="md"  style={{ margin: 8 }} onClick={() => dispatch(showTransactionForm())}>Add Transactions</Button>
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
            }
        </div >
    )
}