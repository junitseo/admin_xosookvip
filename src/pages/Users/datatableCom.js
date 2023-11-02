import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';

const AjaxDatatables = () => {
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Name</span>,
            selector: row => row.name,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Position</span>,
            selector: row => row.position,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Office</span>,
            selector: row => row.office,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Extn.</span>,
            selector: row => row.office,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Start date</span>,
            selector: row => row.startDate,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Salary</span>,
            selector: row => row.salary,
            sortable: true
        },
    ];

    const data = useMemo(() => [
        {
            id: 1,
            name: "Tiger Nixon",
            position: "System Architect",
            office: "Edinburgh",
            extn: "5421",
            startDate: "2011/04/25",
            salary: "$320,800"
        },
        {
            id: 2,
            name: "Garrett Winters",
            position: "Accountant",
            office: "Tokyo",
            extn: "8422",
            startDate: "2011/07/25",
            salary: "$170,750"
        },
        {
            id: 3,
            name: "Ashton Cox",
            position: "Junior Technical Author",
            office: "San Francisco",
            extn: "1562",
            startDate: "2009/01/12",
            salary: "$86,000"
        },
        {
            id: 4,
            name: "Cedric Kelly",
            position: "Senior Javascript Developer",
            office: "Edinburgh",
            extn: "6224",
            startDate: "2012/03/29",
            salary: "$433,060"
        },
        {
            id: 5,
            name: "Airi Satou",
            position: "Accountant",
            office: "Tokyo",
            extn: "5407",
            startDate: "2008/11/28",
            salary: "$162,700"
        },
        {
            id: 6,
            name: "Brielle Williamson",
            position: "Integration Specialist",
            office: "New York",
            extn: "4804",
            startDate: "2012/12/02",
            salary: "$372,000"
        },
        {
            id: 7,
            name: "Herrod Chandler",
            position: "Sales Assistant",
            office: "San Francisco",
            extn: "9608",
            startDate: "2012/08/06",
            salary: "$137,500"
        },
        {
            id: 8,
            name: "Rhona Davidson",
            position: "Integration Specialist",
            office: "Tokyo",
            extn: "6200",
            startDate: "2010/10/14",
            salary: "$327,900"
        },
        {
            id: 9,
            name: "Colleen Hurst",
            position: "Javascript Developer",
            office: "San Francisco",
            extn: "2360",
            startDate: "2009/09/15",
            salary: "$205,500"
        },
        {
            id: 10,
            name: "Sonya Frost",
            position: "Software Engineer",
            office: "Edinburgh",
            extn: "1667",
            startDate: "2008/12/13",
            salary: "$103,600",
        },
        {
            id: 11,
            name: "Jena Gaines",
            position: "Office Manager",
            office: "London",
            extn: "3814",
            startDate: "2008/12/19",
            salary: "$90,560",
        },
        {
            id: 12,
            name: "Quinn Flynn",
            position: "Support Lead",
            office: "Edinburgh",
            extn: "9497",
            startDate: "2013/03/03",
            salary: "$342,000",
        },
        {
            id: 13,
            name: "Charde Marshall",
            position: "Regional Director",
            office: "San Francisco",
            extn: "6741",
            startDate: "2008/10/16",
            salary: "$470,600"
        },
        {
            id: 14,
            name: "Haley Kennedy",
            position: "Senior Marketing Designer",
            office: "London",
            extn: "3597",
            startDate: "2012/12/18",
            salary: "$313,500"
        },
        {
            id: 15,
            name: "Tatyana Fitzpatrick",
            position: "Regional Director",
            office: "London",
            extn: "1965",
            startDate: "2010/03/17",
            salary: "$385,750",
        },
    ], []);

    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [data]);

    return (
        <DataTable
            columns={columns}
            pagination
            data={rows}
            progressPending={pending}
        />
    );
};

export { AjaxDatatables };
