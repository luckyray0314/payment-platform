import {Box, Text,Navbar, NavLink, Button} from "@mantine/core";
import {ReactComponent as DashboardIcon} from '../assets/Widget.svg'
import {ReactComponent as TransactionsIcon} from '../assets/Collapse.svg'
import {ReactComponent as AccountsIcon} from '../assets/Database.svg'
import {ReactComponent as BudgetIcon} from '../assets/Date_range.svg'
import {ReactComponent as GoalsIcon} from '../assets/Road_finish.svg'
import {ReactComponent as DebtsIcon} from '../assets/Calendar.svg'
import {ReactComponent as ReportsIcon} from '../assets/Desk_alt.svg'
import {ReactComponent as AddIcon} from '../assets/Add_round.svg'

export default function SideBar() {
    return (
        <div>
            <Navbar
                width={{
                    // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
                    sm: 300,

                    // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
                    lg: 250,

                    // When other breakpoints do not match base width is used, defaults to 100%
                    base: 100,
                }}
            >

                <Navbar.Section mt="xs">
                    <Text fw={500} style={{margin: 20}}>Main menu</Text>
                </Navbar.Section>
                <Navbar.Section grow mt="md">
                    <Box>
                        <NavLink
                            style={{borderRadius: 8, margin: 10, width: 230}}
                            label="Dashboard"
                            icon={<DashboardIcon/>}
                            rightSection={<></>}
                            color="dark"
                            active
                            disabled
                        />
                        <NavLink
                            style={{borderRadius: 8, margin: 10, width: 230}}
                            label="Transactions"
                            icon={<TransactionsIcon/>}
                            rightSection={<></>}
                        />
                        <NavLink
                            style={{borderRadius: 8, margin: 10, width: 230}}
                            label="Accounts"
                            icon={<AccountsIcon/>}
                            rightSection={<></>}
                        /><NavLink
                        style={{borderRadius: 8, margin: 10, width: 230}}
                        label="Budget"
                        icon={<BudgetIcon/>}
                        rightSection={<></>}
                    /><NavLink
                        style={{borderRadius: 8, margin: 10, width: 230}}
                        label="Goals"
                        icon={<GoalsIcon/>}
                        rightSection={<></>}
                    /><NavLink
                        style={{borderRadius: 8, margin: 10, width: 230}}
                        label="Debts"
                        icon={<DebtsIcon/>}
                        rightSection={<></>}
                    />
                        <NavLink
                            style={{borderRadius: 8, margin: 10, width: 230}}
                            label="Reports"
                            icon={<ReportsIcon/>}
                            rightSection={<></>}
                        />


                    </Box>
                </Navbar.Section>
                <Navbar.Section>
                    <Button leftIcon={<AddIcon/>} radius={"md"} style={{ margin: 10, width: 230}} >
                        New
                    </Button>
                </Navbar.Section>


            </Navbar>
        </div>

    )
}