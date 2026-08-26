import { FC, useContext } from 'react';
import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import CodeEditor from './CodeEditor';
import { LocaleContext } from '../LocaleContext/LocaleContext';

interface SecondaryEditorProps {
  changeVariables: React.Dispatch<React.SetStateAction<string>>;
  changeHeaders: React.Dispatch<React.SetStateAction<string>>;
}

const SecondaryEditor: FC<SecondaryEditorProps> = ({
  changeVariables,
  changeHeaders,
}) => {
  const [activeTab, setActiveTab] = React.useState('variables');
  const [open, setOpen] = React.useState(false);
  const { locales, lang } = useContext(LocaleContext);

  const handleOpen = (value: boolean): void =>
    setOpen(open === value ? false : true);

  return (
    <Tabs className="w-full" value={activeTab}>
      <Accordion
        open={open}
        data-testid="accordion"
        data-open={open}
        icon={
          <ChevronDownIcon
            onClick={() => handleOpen(true)}
            strokeWidth={2.5}
            role="button"
            data-testid="tabs-shevron-btn"
            className={`h-3.5 w-3.5 transition hover:bg-peachFuzz-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        }
      >
        <AccordionHeader className="py-0">
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
            }}
          >
            <Tab
              value={'variables'}
              onClick={() => {
                setActiveTab('variables');
                if (!open) handleOpen(true);
              }}
              className={`transition hover:bg-peachFuzz-200 ${
                activeTab === 'variables'
                  ? 'text-gray-900 w-26 md:w-32 lg:w-36'
                  : 'w-26 md:w-32 lg:w-36'
              }`}
              data-testid="variables-tab"
            >
              {locales[lang].graphiQL.variables}
            </Tab>
            <Tab
              value={'header'}
              onClick={() => {
                setActiveTab('header');
                if (!open) handleOpen(true);
              }}
              className={`transition hover:bg-peachFuzz-200 ${
                activeTab === 'variables'
                  ? 'text-gray-900 w-26 md:w-32 lg:w-36'
                  : 'w-26 md:w-32 lg:w-36'
              }`}
              data-testid="header-tab"
            >
              {locales[lang].graphiQL.headers}
            </Tab>
          </TabsHeader>
        </AccordionHeader>
        <AccordionBody className="py-0">
          <TabsBody className="h-full">
            <TabPanel
              className="p-0 h-full overflow-auto h-[150px]"
              value={'variables'}
              data-testid="tabpanel-variables"
            >
              <CodeEditor
                mode="editor"
                onchange={changeVariables}
                defaultValue={'{\n\n}\n'}
              />
            </TabPanel>
            <TabPanel
              className="p-0 h-full overflow-auto h-[150px]"
              value={'header'}
              data-testid="tabpanel-header"
            >
              <CodeEditor
                mode="editor"
                onchange={changeHeaders}
                defaultValue={'{\n\n}\n'}
              />
            </TabPanel>
          </TabsBody>
        </AccordionBody>
      </Accordion>
    </Tabs>
  );
};

export default SecondaryEditor;
