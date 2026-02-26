import { useState } from "react"
import { Menu, Group, NumberInput, Text } from "@mantine/core"
import { IconArrowsLeftRight, IconEqual, IconFilter, IconMathGreater, IconMathLower } from "@tabler/icons-react";

type FilterMode = 'equals' | 'greater' | 'less' | 'between';

interface NumberFilterProps {
    onChange: (filterData: { mode: FilterMode; value1: number | string; value2?: number | string }) => void;
}

export const NumberFilter = ({ onChange }: NumberFilterProps) => {
    const [mode, setMode] = useState<FilterMode>('equals')
    const [val1, setVal1] = useState<number | string>('');
    const [val2, setVal2] = useState<number | string>('');

    const triggerChange = (newMode: FilterMode, newVal1: number|string, newVal2: number|string) => {
        onChange({ mode: newMode, value1: newVal1, value2: newVal2 });
    }

    const filterMenu = (
        <Menu>
            <Menu.Target>
                <IconFilter/>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Filter mode</Menu.Label>
                <Menu.Item 
                    leftSection={<IconEqual size={14} />} 
                    color={mode === 'equals' ? 'blue' : undefined}
                    onClick={() => { setMode('equals'); triggerChange('equals', val1, val2); }}
                >
                    Equals
                </Menu.Item>
                <Menu.Item 
                    leftSection={<IconMathGreater size={14} />} 
                    color={mode === 'greater' ? 'blue' : undefined}
                    onClick={() => { setMode('greater'); triggerChange('greater', val1, val2); }}
                >
                    Greater Than
                </Menu.Item>
                <Menu.Item 
                    leftSection={<IconMathLower size={14} />} 
                    color={mode === 'less' ? 'blue' : undefined}
                    onClick={() => { setMode('less'); triggerChange('less', val1, val2); }}
                >
                    Less Than
                </Menu.Item>
                <Menu.Item 
                    leftSection={<IconArrowsLeftRight size={14} />} 
                    color={mode === 'between' ? 'blue' : undefined}
                    onClick={() => { setMode('between'); triggerChange('between', val1, val2); }}
                >
                    Between
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )

    return (
        <Group>
            {mode === 'between' ? (
                <Group gap="xs" align="flex-end">
                    <NumberInput 
                        label="DIAMETER (MIN)" 
                        placeholder="Min" 
                        value={val1}
                        onChange={(v) => { setVal1(v); triggerChange(mode, v, val2); }}
                    />
                    <Text mb={8}>-</Text>
                    <NumberInput 
                        label="DIAMETER (MAX)" 
                        placeholder="Max" 
                        value={val2}
                        onChange={(v) => { setVal2(v); triggerChange(mode, val1, v); }}
                    />
                </Group>
            ) : (
                <NumberInput 
                    label="DIAMETER (MM)" 
                    placeholder="e.g. 159" 
                    value={val1}
                    onChange={(v) => { setVal1(v); triggerChange(mode, v, val2); }}
                />
            )}
            {filterMenu}
        </Group>
    );
}