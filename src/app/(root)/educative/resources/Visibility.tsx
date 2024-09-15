import { Switch } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";
import toastMsg from "@/utils/toaster";

export default function ResourceVisibilitySwitch({ resource, resources, setResources, setLoading }:{ resource: any, resources: any, setResources: any, setLoading: any }) {
    const [enabled, setEnabled] = useState(resource.visible);

    const handleChange = (checked: boolean) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("_method", "PATCH");
        formData.append("visible", checked ? "1" : "0");
        formData.append("_id", resource._id!);
        axios
            .patch(`/api/resources/${resource._id}`, formData)
            .then((res) => {
                if (res.status == 200) {
                    toastMsg("success", "Resource visibility updated successfully");
                    setResources(
                        resources.map((r: { _id: any; visible: boolean; }) => {
                            if (r._id == resource._id) {
                                r.visible = checked;
                            }
                            return r;
                        })
                    );
                } else {
                    toastMsg("error", "Failed to update resource visibility");
                }
            })
            .catch(() => {
                toastMsg("error", "Failed to update resource visibility");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Switch
            checked={enabled}
            onChange={(checked) => {
                setEnabled(checked);
                handleChange(checked);
            }}
            className={`${enabled ? "bg-primary" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span
                className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    );
}
