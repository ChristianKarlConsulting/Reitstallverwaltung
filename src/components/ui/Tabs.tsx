import React from 'react';

type TabsProps = {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
};

type TabsListProps = {
  className?: string;
  children: React.ReactNode;
};

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

const TabsContext = React.createContext<{
  value: string;
  onChange: (value: string) => void;
}>({
  value: '',
  onChange: () => {},
});

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  className = '',
  children,
}) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`flex space-x-4 border-b ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
  const { value: selectedValue, onChange } = React.useContext(TabsContext);
  const isSelected = value === selectedValue;

  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors relative ${
        isSelected
          ? 'text-indigo-600'
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => onChange(value)}
    >
      {children}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
      )}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const { value: selectedValue } = React.useContext(TabsContext);

  if (value !== selectedValue) return null;

  return <div className="pt-4">{children}</div>;
};