import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';

const SalesOverview = () => {

    const [entreprises, change_entreprises]  = useState([]) ;

    useEffect(() => {
        axios.get('http://localhost:3500/stage/entreprise')
          .then(response => { change_entreprises(response.data)
            console.log('entreprises',response.data) })
          .catch(error => console.error('Error fetching notes', error));
          
      }, []);

    // select
    const [month, setMonth] = React.useState('1');

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: entreprises.map(entry => entry.nom_entreprise), // Noms des entreprises marocaines
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };

    const seriescolumnchart = [
        {
            name: 'Nombre d\'étudiants',
            data: entreprises.map(entry => Number(entry.number_of_stages)), // Exemple de nombres aléatoires pour les étudiants par entreprise
        }
    ];

    return (
        <DashboardCard title="Nombre des étudiants par entreprise " action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={1}>2023</MenuItem>
                <MenuItem value={2}>2022</MenuItem>
                <MenuItem value={3}>2021</MenuItem>
                <MenuItem value={3}>2020</MenuItem>
                <MenuItem value={3}>2019</MenuItem>
                <MenuItem value={3}>2018</MenuItem>
                <MenuItem value={3}>2017</MenuItem>

            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default SalesOverview;
