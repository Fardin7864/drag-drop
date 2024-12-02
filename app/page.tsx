"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'

// DotGrid Component
const DotGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="w-[3px] h-[3px] bg-gray-400 rounded-full" />
      ))}
    </div>
  )
}

type ColumnsState = {
  location: boolean
  numbersOfFlat: boolean
  category: boolean
  type: boolean
  status: boolean
  publishDate: boolean
  activeInactive: boolean
}

const ManageColumns: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [columnsOrder, setColumnsOrder] = useState<(keyof ColumnsState)[]>([
    'location',
    'numbersOfFlat',
    'category',
    'type',
    'status',
    'publishDate',
    'activeInactive',
  ])
  const [columns, setColumns] = useState<ColumnsState>({
    location: true,
    numbersOfFlat: true,
    category: false,
    type: true,
    status: true,
    publishDate: true,
    activeInactive: true,
  })

  const toggleColumn = (columnKey: keyof ColumnsState) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnKey]: !prevColumns[columnKey],
    }))
  }

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm flex items-center"
      >
        <span>Manage Column</span>
        <svg
          className="ml-2 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute mt-2 bg-white border border-gray-300 shadow-lg rounded-md w-64 p-4 overflow-hidden"
          >
            {/* Reorder.Group is used to make the list draggable */}
            <Reorder.Group
              axis="y"
              values={columnsOrder}
              onReorder={setColumnsOrder}
              className="flex flex-col"
            >
              {columnsOrder.map((columnKey) => (
                <Reorder.Item
                  key={columnKey}
                  value={columnKey}
                  onClick={() => toggleColumn(columnKey)} // Click event for the entire item
                  className="flex items-center justify-between space-x-2 py-2 cursor-grab"
                  whileDrag={{ scale: 1.05 }} // Optional animation for drag feedback
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 border-2 rounded-[5px] ${
                        columns[columnKey]
                          ? 'bg-[#E6A105] border-transparent'
                          : 'bg-transparent'
                      } flex items-center justify-center`}
                      onClick={(e) => e.stopPropagation()} // Prevent bubbling to item click
                    >
                      {columns[columnKey] && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="capitalize">
                      {columnKey.replace(/([A-Z])/g, ' $1')}
                    </span>
                  </div>
                  {/* Add the DotGrid component next to the item */}
                  <DotGrid />
                </Reorder.Item>
              ))}
            </Reorder.Group>
            <div className="text-right mt-4">
              <button
                onClick={toggleMenu}
                className="bg-common text-white py-1 px-3 rounded-md"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ManageColumns
