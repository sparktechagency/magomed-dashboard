import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal } from "antd";
import { useState } from "react";

const ProjectManagementTableBody = ({ user, list }) => {
  const [userDetailsModalVisible, setUserDetailsModalVisible] = useState(false);

  const handleViewDetails = () => {
    setUserDetailsModalVisible(true);
  };

  // Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="grid grid-cols-10 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="py-3 text-center">{list}</div>
        <div className="px-3 py-3 text-center">{user?.name}</div>
        <div className="px-3 py-3 text-center">{user.frelancherName}</div>
        <div className="px-4 py-3 text-center">{user.projectName || user.companyName || 'N/A'}</div>
        <div className="px-4 py-3 text-center">{user.invoiceNumber || user.jobPostQuantity || 'N/A'}</div>
        <div className="px-4 py-3 text-center">{user.serviceType || user.tenderPostQuantity || 'N/A'}</div>
        <div className="px-4 py-3 text-center">{user.WorkingDay || user.ProjectCompletedQuantity || 'N/A'}</div>
        <div className="px-4 py-3 text-center">{user.remaining || 'N/A'}</div>
        <div className={`flex items-center justify-center py-3`}>{user.status}</div>
        <div className=" border rounded border-primary flex justify-center w-4/12 mx-auto items-center">
          <Button
            type="text"
            icon={<EyeOutlined style={{ fontSize: '18px' }} />}
            className="text-primary hover:text-primary w-32"
            onClick={handleViewDetails}
          />
        </div>
      </div>

      <Modal
        open={userDetailsModalVisible}
        onCancel={() => setUserDetailsModalVisible(false)}
        footer={null}
        closable={false}
        width={500}
        centered
        className="user-details-modal"
      >
        <div className="relative">
          {/* Custom Close Button */}
          <Button
            type="text"
            icon={<CloseOutlined />}
            className="absolute top-0 right-0 text-primary hover:text-primary text-lg"
            onClick={() => setUserDetailsModalVisible(false)}
            style={{
              border: '2px solid #002282',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />

          {/* Modal Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
          </div>

          {/* User Details */}
          <div className="border border-primary p-6 rounded-lg">
            <div className="flex justify-center mb-6">
              <Avatar
                size={180}
                src={user.image || "https://i.ibb.co/z5YHLV9/profile.png"}
                className="border-4 border-gray-200"
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Name:</span>
                <span className="">{user?.name}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Status:</span>
                <span className="capitalize">{"Active"}</span>
              </div>

              <div className="flex gap-1 items-center py-2 ">
                <span className="font-medium">Phone Number: </span>
                <span className="">{user?.phone || 'N/A'}</span>
              </div>

              <div className="flex items-center py-2 gap-1">
                <span className="font-medium ">Email: </span>
                <span className="">{user?.email}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium ">Joined:</span>
                <span className="">{formatDate(user.createdAt)}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Verified:</span>
                <span className="">{user.verified ? 'Yes' : 'No'}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Total Trip:</span>
                <span className="">N/A</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Total Amount Spend:</span>
                <span className="">N/A</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectManagementTableBody;