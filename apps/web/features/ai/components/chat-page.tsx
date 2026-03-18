'use client';

import { useState, useCallback } from 'react';
import { InitialView } from './initial-view';
import { ActiveView } from './active-view';
import type { ChatMessageData } from './message-block';
import type { HealthInsight } from './insight-panel';

const demoInsight: HealthInsight = {
  id: 'insight-1',
  title: 'Lipid Panel Trend Analysis',
  type: 'lab_trend',
  status: 'ready',
  data: {
    metrics: [
      { title: 'LDL Cholesterol', value: '98', unit: 'mg/dL', delta: '14 from last', deltaDirection: 'down', sparkData: [142, 130, 125, 118, 112, 98], status: 'normal' },
      { title: 'HDL Cholesterol', value: '58', unit: 'mg/dL', delta: '6 from last', deltaDirection: 'up', sparkData: [52, 53, 54, 55, 57, 58], status: 'normal' },
      { title: 'Triglycerides', value: '162', unit: 'mg/dL', delta: '34 from last', deltaDirection: 'up', sparkData: [128, 135, 142, 148, 155, 162], status: 'warning' },
      { title: 'Total Cholesterol', value: '214', unit: 'mg/dL', delta: '18 from last', deltaDirection: 'down', sparkData: [248, 240, 232, 226, 220, 214], status: 'warning' },
    ],
    labResults: [
      { metric: 'LDL Cholesterol', value: '98', unit: 'mg/dL', range: '0 – 100 mg/dL', trend: [142, 130, 125, 118, 112, 98], status: 'normal', date: 'Mar 10, 2026' },
      { metric: 'HDL Cholesterol', value: '58', unit: 'mg/dL', range: '> 40 mg/dL', trend: [52, 53, 54, 55, 57, 58], status: 'normal', date: 'Mar 10, 2026' },
      { metric: 'Triglycerides', value: '162', unit: 'mg/dL', range: '< 150 mg/dL', trend: [128, 135, 142, 148, 155, 162], status: 'warning', date: 'Mar 10, 2026' },
      { metric: 'Total Cholesterol', value: '214', unit: 'mg/dL', range: '< 200 mg/dL', trend: [248, 240, 232, 226, 220, 214], status: 'warning', date: 'Mar 10, 2026' },
    ],
    summary: 'Your lipid panel shows meaningful improvement over the past 12 months. LDL cholesterol has dropped from 142 to 98 mg/dL, now within the optimal range. HDL increased slightly from 52 to 58 mg/dL. However, triglycerides have trended upward from 128 to 162 mg/dL, crossing the 150 threshold. Total cholesterol is down but still slightly above the 200 target. This pattern is consistent with improved cholesterol metabolism but may warrant a conversation about dietary triglyceride sources.',
    sources: [
      { label: '6 lipid panel observations', icon: '\u25CE' },
      { label: 'Mar 2025 – Mar 2026', icon: '\u25F7' },
      { label: 'Quest + LabCorp', icon: '\u27D0' },
    ],
  },
};

export function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeInsight, setActiveInsight] = useState<HealthInsight | null>(null);

  const hasMessages = messages.length > 0;

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;

    const userMessage: ChatMessageData = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    // Simulate AI response — will be replaced with real AI SDK streaming
    setTimeout(() => {
      const aiMessage: ChatMessageData = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content:
          'Your lipid panel shows meaningful improvement over the past 12 months. LDL dropped from 142 to 98 mg/dL \u2014 now within the optimal range. HDL increased slightly from 52 to 58. However, your triglycerides have trended upward from 128 to 162 mg/dL, crossing the 150 threshold. This pattern is consistent with improved cholesterol metabolism but may warrant a conversation about dietary triglyceride sources.',
        sources: [
          { label: '6 lipid panel observations', icon: '\u25CE' },
          { label: 'Mar 2025 \u2013 Mar 2026', icon: '\u25F7' },
          { label: 'Quest + LabCorp', icon: '\u27D0' },
        ],
        artifactId: 'insight-1',
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsStreaming(false);
      setActiveInsight(demoInsight);
      setPanelOpen(true);
    }, 1500);
  }, [input]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInput(suggestion);
  }, []);

  const handleArtifactClick = useCallback(() => {
    setActiveInsight(demoInsight);
    setPanelOpen(true);
  }, []);

  const handlePanelClose = useCallback(() => {
    setPanelOpen(false);
  }, []);

  if (!hasMessages) {
    return (
      <InitialView
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        onSuggestionClick={handleSuggestionClick}
      />
    );
  }

  return (
    <ActiveView
      messages={messages}
      input={input}
      onInputChange={setInput}
      onSubmit={handleSubmit}
      isStreaming={isStreaming}
      panelOpen={panelOpen}
      activeInsight={activeInsight}
      onPanelClose={handlePanelClose}
      onArtifactClick={handleArtifactClick}
    />
  );
}
