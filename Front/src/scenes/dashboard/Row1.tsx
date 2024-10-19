import DashboardBox from '@/components/DashboardBox'
import { useGetSensorDataQuery } from '@/state/api';

type Props = {}

const Row1 = (props: Props) => {
const { data } = useGetSensorDataQuery();
  return (
    <>
    <DashboardBox  gridArea="a"></DashboardBox>
    <DashboardBox  gridArea="b"></DashboardBox>
    <DashboardBox  gridArea="c"></DashboardBox>
    <DashboardBox  gridArea="d"></DashboardBox>

    </>
  )
}

export default Row1;