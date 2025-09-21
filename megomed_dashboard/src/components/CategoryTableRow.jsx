import { CloseOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, Switch, message } from "antd";
import { useState } from "react";
import {
  useUpdateCategoryStatusMutation,
  useDeleteCategoryMutation,
} from "../features/category/categoryApi";

const CategoryTableRow = ({ item, list }) => {
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [userDetailsModalVisible, setUserDetailsModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(item.isActive);

  const [updateCategoryStatus, { isLoading: isStatusUpdating }] =
    useUpdateCategoryStatusMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleViewDetails = () => {
    setUserDetailsModalVisible(true);
  };

  const handleSwitchChange = () => {
    setSwitchModalVisible(true);
  };

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleConfirmSwitch = async () => {
    try {
      const newStatus = !currentStatus;
      await updateCategoryStatus({
        id: item._id,
        isActive: newStatus,
      }).unwrap();

      setCurrentStatus(newStatus);
      message.success(
        `Category status updated to ${newStatus ? "active" : "inactive"}`
      );
      setSwitchModalVisible(false);
    } catch (err) {
      message.error("Failed to update category status");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(item._id).unwrap();
      message.success("Category deleted successfully");
      setRemoveModalVisible(false);
    } catch (error) {
      message.error("Failed to delete category");
    }
  };

  // Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="grid grid-cols-5 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="py-3 text-center">{list}</div>
        <div className="px-3 py-3 text-center">{item.name}</div>
        <div className="px-4 py-3 text-center">
          {formatDate(item.createdAt)}
        </div>
        <div
          className={`flex items-center justify-center py-3 ${
            currentStatus === true ? "text-green-500" : "text-red-500"
          }`}
        >
          {currentStatus === true ? "Active" : "Inactive"}
        </div>
        <div className="mx-auto w-1/2 flex items-center justify-end gap-2 border rounded border-primary px-1 ">
          <Button
            type="text"
            icon={<EyeOutlined style={{ fontSize: "18px" }} />}
            className="text-primary hover:text-primary w-32"
            onClick={handleViewDetails}
          />
          <Switch
            checked={currentStatus === true}
            size="small"
            className="ml-2"
            onChange={handleSwitchChange}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="text-red-500 hover:text-red-600"
            onClick={handleDelete}
          />
        </div>
      </div>

      {/* Switch Confirmation Modal */}
      <Modal
        open={switchModalVisible}
        onCancel={() => setSwitchModalVisible(false)}
        footer={null}
        closable={false}
        width={350}
        centered
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium mb-6">
            {currentStatus === true
              ? "Are you sure Turn off this Category?"
              : "Are you sure Turn on this Category?"}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setSwitchModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmSwitch}
              loading={isStatusUpdating}
              className="px-8 bg-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={removeModalVisible}
        onCancel={() => setRemoveModalVisible(false)}
        footer={null}
        closable={false}
        width={350}
        centered
      >
        <div className="text-center py-4">
          <p className="text-base font-medium text-black mb-6">
            Are you sure Remove this Category
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRemoveModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmDelete}
              loading={isDeleting}
              className="px-8 bg-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Category Details Modal */}
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
              border: "2px solid #002282",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          {/* Modal Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-4">Category Information</h2>
          </div>

          {/* Category Details */}
          <div className="border border-primary p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Category Name:</span>
                <span>{item.name}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Status:</span>
                <span
                  className={`capitalize ${
                    currentStatus === true ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {currentStatus === true ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Created At:</span>
                <span>{formatDate(item.createdAt)}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Last Updated:</span>
                <span>{formatDate(item.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoryTableRow;
