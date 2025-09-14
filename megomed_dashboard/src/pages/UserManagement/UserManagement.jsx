import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select } from 'antd';
import { useState } from 'react';
import UserManagementTable from "../../components/UserManagmentTable";


const { Option } = Select;

function UserManagement() {
  // State for active tab (Institution or Department)
  const [activeTab, setActiveTab] = useState('freelancher');
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('All category');

  const freelancherColumns = [
    "SL",
    "Name",
    "Email",
    "Service Type",
    "Category Type",
    "Project Completed",
    "Total Earn",
    "Location",
    "Status",
    "Action"
  ];

  const freeLancherData = [
    {
      id: 1,
      name: 'Sabbir Ahmed',
      email: "john.doe@example.com",
      ServiceType: "Design",
      CategoryType: "UI/UX Designer",
      ProjectCompletedQuantity: 5,
      TotalEarn: 5000,
      location: "Bangladesh",
      status: "Active"
    }
  ]


  const clientColumns = [
    "SL",
    "Name",
    "Email",
    "Company Name",
    "Job Post",
    "Tender Post",
    "Project Completed",
    "Total Spend",
    "Location",
    "Status",
  ];


  const clientData = [
    {
      id: 1,
      name: 'Pronab kumar',
      email: "john.doe@example.com",
      companyName: "xyz name",
      jobPostQuantity: 5,
      tenderPostQuantity: 5,
      ProjectCompletedQuantity: 5,
      TotalSpend: 5000,
      location: "Bangladesh",
      status: "Active"

    }
  ]



  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6 flex justify-between">
        <div>
          <Button
            type={activeTab === 'freelancher' ? 'primary' : 'default'}
            className={`mr-2 ${activeTab === 'freelancher' ? 'bg-[#002282]' : ''}`}
            onClick={() => setActiveTab('freelancher')}
          >
            Freelancer
          </Button>
          <Button
            type={activeTab === 'client' ? 'primary' : 'default'}
            className={activeTab === 'client' ? 'bg-[#002282]' : ''}
            onClick={() => setActiveTab('client')}
          >
            client
          </Button>
        </div>

        <div className="flex justify-between items-center">
          {/* Search Input */}
          <Input
            placeholder="Search here"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            suffix={<SearchOutlined />}
            className="w-full md:w-96 mr-4"
          />

          <DatePicker className='w-full md:w-52 mr-4 h-11' picker="month" />

          {/* Category Selector */}
          <Select
            value={category}
            onChange={(value) => setCategory(value)}
            className="w-full md:w-64"
          >
            <Select.Option value="All category">
              <span className="flex gap-3 items-center">
                <FilterOutlined />
                All category
              </span>
            </Select.Option>
            <Select.Option value="Category 1">Category 1</Select.Option>
            <Select.Option value="Category 2">Category 2</Select.Option>
          </Select>
        </div>
      </div>

      <div className=" rounded-md">
        {activeTab === 'freelancher' ? (
          <UserManagementTable columns={freelancherColumns} data={freeLancherData} />
        ) : (
          <UserManagementTable columns={clientColumns} data={clientData} />
        )}
      </div>

    </div>
  );
}

export default UserManagement;