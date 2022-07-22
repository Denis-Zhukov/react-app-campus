import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export const ToolkitStudentsTable = ({selectedStudent, setSelectedStudent}) => {
    const {list: students} = useSelector(state => state.rating);


    return (
        <Table>
            <thead style={{background: "#212529", color: "white", fontWeight: "bold"}}>
                <tr>
                    <th>#</th>
                    <th>Имя студента</th>
                    <th>Факультет</th>
                    <th>Баллы</th>
                    <th>Номер общежития</th>
                </tr>
            </thead>
            <tbody>
            {
                students?.map((s, i) => (
                    <tr
                        key={s.id} onClick={(e) => {
                        setSelectedStudent(s.id);
                    }}
                        style={
                            {
                                cursor: "pointer",
                                color: "white",
                                background: selectedStudent === s.id ? "#999" : i % 2 === 0 ? "#2c3034" : "#212529",
                            }
                        }
                    >
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.phone}</td>
                        <td>{s.website}</td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    );
};