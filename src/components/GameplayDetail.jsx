import React from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableRow } from "flowbite-react";
import { useParams } from 'react-router-dom'
import matters from '../data/matters.json'
import { DescriptionText } from './DescriptionText'
import NotFoundComponent from './NotFoundComponent'

const GameplayDetail = () => {
  const { id } = useParams();

  const matter = matters.find(matter => matter.id === parseInt(id)) || null
  
  if (!matter) {
    return (
      <NotFoundComponent params={{message: "Sorry, no matter found.", route:'/matters', type:'matter', data:matters}}/>
    )
  }

  return (
    <div className='lg:m-auto lg:max-w-360 py-4 px-6'>
      <h1 className="text-4xl font-bold dark:text-white capitalize mb-4">
        {matter.name} Matter Set
      </h1>

      <Table striped>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="text-xl text-center font-bold text-gray-900 dark:text-white">
              2-Piece Set
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="text-center text-gray-900 dark:text-white">
              <DescriptionText text={matter.set2}/>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="text-xl text-center font-bold text-gray-900 dark:text-white">
              4-Piece Set
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="text-center text-gray-900 dark:text-white">
              <DescriptionText text={matter.set4}/>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="text-xl text-center font-bold text-gray-900 dark:text-white">
              5-Piece Set
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="text-center text-gray-900 dark:text-white">
              <DescriptionText text={matter.set5}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default GameplayDetail
