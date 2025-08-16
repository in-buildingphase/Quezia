"use client";

import { PillButton } from "./pill-button";
import { useState } from "react";

interface NavigationTabsProps {
    onTabChange?: (tab: string) => void;
    className?: string;
}

export function NavigationTabs({ onTabChange, className = "" }: NavigationTabsProps) {
    const [activeTab, setActiveTab] = useState("Templates");

    const tabs = [
        { id: "Your designs", label: "Your designs" },
        { id: "Templates", label: "Templates" },
        { id: "Canva AI", label: "Canva AI" }
    ];

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        if (onTabChange) {
            onTabChange(tabId);
        }
    };

    return (
        <div className={`flex items-center justify-center space-x-4 ${className}`}>
            {tabs.map((tab) => (
                <PillButton
                    key={tab.id}
                    variant={activeTab === tab.id ? "active" : "default"}
                    onClick={() => handleTabClick(tab.id)}
                    className="min-w-[120px] text-center"
                >
                    {tab.label}
                </PillButton>
            ))}
        </div>
    );
}
