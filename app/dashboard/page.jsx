import { useTranslations } from "next-intl";
import React from "react";

const Dashboard = () => {
    const t = useTranslations('HomePage');

    return (
        <div>
            {t('authenticated')}
        </div>
    )
}

export default Dashboard;