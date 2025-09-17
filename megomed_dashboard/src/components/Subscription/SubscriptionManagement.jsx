import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import ClientSubscription from "./ClientSubscription";
import FreeLacherSubscription from "./FreeLacherSubscription";
import {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
} from "../../features/subscription/subscriptionApi";

function SubscriptionManagement() {
  const [activeTab, setActiveTab] = useState("freelancher");
  const { data: subscriptions, isLoading, isError } = useGetSubscriptionQuery();
  const [createSubscription] = useCreateSubscriptionMutation();

  const freelancherSubscriptions = subscriptions?.data?.filter(
    (subscription) => subscription.category === "freelancher"
  );
  const clientSubscriptions = subscriptions?.data?.filter(
    (subscription) => subscription.category === "client"
  );

  const handleCreateSubscription = () => {
    const newSubscription = {
      title: `New ${
        activeTab === "freelancher" ? "Freelancer" : "Client"
      } Plan`,
      price: 0,
      type: "monthly",
      category: activeTab === "freelancher" ? "freelancher" : "client",
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

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Button
            type={activeTab === "freelancher" ? "primary" : "default"}
            className={`mr-2 ${
              activeTab === "freelancher" ? "bg-[#002282]" : ""
            }`}
            onClick={() => setActiveTab("freelancher")}
          >
            Freelancer
          </Button>
          <Button
            type={activeTab === "client" ? "primary" : "default"}
            className={activeTab === "client" ? "bg-[#002282]" : ""}
            onClick={() => setActiveTab("client")}
          >
            Client
          </Button>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateSubscription}
        >
          Add New Subscription Plan
        </Button>
      </div>

      <div className="rounded-md">
        {activeTab === "freelancher" ? (
          <FreeLacherSubscription subscriptions={freelancherSubscriptions} />
        ) : (
          <ClientSubscription subscriptions={clientSubscriptions} />
        )}
      </div>
    </div>
  );
}

export default SubscriptionManagement;
