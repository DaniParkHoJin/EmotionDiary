import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import {useState, useContext, useEffect} from "react";
import {DiaryStateContext} from "../App";
import {getMonthRangeByDate} from "../util";
import DiaryList from "../component/DiaryList";
import {getMonthRangeBydate, setPageTitle} from "../util";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filterdData, setFilterdData] = useState([]);

    const headerTitle = `${pivotDate.getFullYear()}년
    ${pivotDate.getMonth() + 1}월`;
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }
    useEffect(() => {
        setPageTitle("Parkhojin의 감정 일기장");
    }, []);

    useEffect(() => {
        if (data.length >= 1) {
            const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
            setFilterdData(data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
                )
            );
        } else {
            setFilterdData([]);
        }

    }, [data, pivotDate]);

    return (
        <div>
            <Header
                title={headerTitle}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
            />
            <DiaryList data={filterdData}/>
        </div>
    );
};
export default Home;