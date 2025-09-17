import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, Modal, Empty } from "antd";
import { useState } from "react";

import { baseURLImage } from "../../utils/BaseURL";
import { useCreateSubscriptionMutation } from "../../features/subscription/subscriptionApi";

const ClientSubscription = ({ subscriptions }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planName, setPlanName] = useState("");
  const [planFeatures, setPlanFeatures] = useState([]);
  const [createSubscription] = useCreateSubscriptionMutation();

  // Transform API subscriptions into a format we can use
  const plans =
    subscriptions?.map((subscription) => ({
      id: subscription._id,
      name: subscription.title,
      price: `$${subscription.price}`,
      billingPeriod: subscription.type,
      billingInfo: `Billed ${subscription.type}`,
      icon: subscription.image
        ? `${baseURLImage}/${subscription.image.split("/").pop()}`
        : "/icons/plan1.png",
      features: subscription.benefits || [],
    })) || [];

  const handleCreateSubscription = () => {
    const newSubscription = {
      title: "New Client Plan",
      price: 0,
      type: "monthly",
      category: "client",
      benefits: ["Basic feature"],
    };

    createSubscription(newSubscription)
      .unwrap()
      .then(() => {
        // Subscription created successfully
        // The query will automatically refetch due to invalidation
      })
      .catch((error) => {
        console.error("Failed to create subscription", error);
      });
  };

  const showModal = (plan) => {
    setEditingPlan(plan);
    setPlanName(plan.name);
    setPlanFeatures([...plan.features]);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPlan(null);
  };

  const handleSave = () => {
    // Here you would typically update your state or make an API call
    console.log("Saving plan:", {
      ...editingPlan,
      name: planName,
      features: planFeatures,
    });
    setIsModalVisible(false);
  };

  const addFeature = () => {
    setPlanFeatures([...planFeatures, ""]);
  };

  const removeFeature = (index) => {
    const newFeatures = [...planFeatures];
    newFeatures.splice(index, 1);
    setPlanFeatures(newFeatures);
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...planFeatures];
    newFeatures[index] = value;
    setPlanFeatures(newFeatures);
  };

  return (
    <div className="mt-5">
      {plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg">
          <Empty
            description="No Client Subscriptions Available"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="mt-4"
            onClick={handleCreateSubscription}
          >
            Create Subscription Plan
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-100 flex items-center justify-center text-blue-600 mb-4">
                    {typeof plan.icon === "string" ? (
                      <img
                        src={plan.icon}
                        alt={plan.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      plan.icon
                    )}
                  </div>
                  <h3 className="text-blue-600 text-xl font-medium">
                    {plan.name}
                  </h3>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-3xl font-bold">
                      /{plan.billingPeriod}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{plan.billingInfo}</p>
                </div>

                <Divider className="my-4" />

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-primary mr-2 mt-1">✓</div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  type="primary"
                  block
                  className="h-12"
                  onClick={() => showModal(plan)}
                >
                  Edit
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Modal
        title="Change Plan Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
        width={800}
      >
        {editingPlan && (
          <div className="flex">
            <div className="w-1/2 pr-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                  Change Plan Name
                </label>
                <Input
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Enter plan name"
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 text-lg font-semibold">
                    Change Subscription Feature
                  </label>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addFeature}
                    shape="circle"
                    className=""
                  />
                </div>
                <div className="space-y-3">
                  {planFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-grow mr-2"
                      />
                      <Button
                        type="default"
                        icon={<MinusOutlined />}
                        onClick={() => removeFeature(index)}
                        shape="circle"
                        className="flex-shrink-0 hover:text-red-500 hover:border-red-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-1/2 pl-4">
              <Card className="border shadow-sm">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-100 flex items-center justify-center text-blue-600 mb-4">
                    {typeof editingPlan.icon === "string" ? (
                      <img
                        src={editingPlan.icon}
                        alt={planName}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      editingPlan.icon
                    )}
                  </div>
                  <h3 className="text-blue-600 text-xl font-medium">
                    {planName}
                  </h3>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold">
                      {editingPlan.price}
                    </span>
                    <span className="text-gray-600">
                      /{editingPlan.billingPeriod}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {editingPlan.billingInfo}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-primary mr-2 mt-1">✓</div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button type="primary" block className="h-12">
                  Choose Plan
                </Button>
              </Card>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClientSubscription;
