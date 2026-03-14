import { useState, useEffect } from "react"
import { Menu, Group, NumberInput, ActionIcon, rem } from "@mantine/core"
import { IconArrowsLeftRight, IconEqual, IconMathGreater, IconMathLower, IconX } from "@tabler/icons-react";

export interface NumberFilterPayload {
    equal?: number;
    min?: number;
    max?: number;
}

type FilterMode = 'equals' | 'greater' | 'less' | 'between';

interface NumberFilterProps {
    label?: string;
    onChange: (payload: NumberFilterPayload | null) => void;
}

export const NumberFilter = ({ label = "DIAMETER", onChange }: NumberFilterProps) => {
    const [mode, setMode] = useState<FilterMode>('equals')
    const [val1, setVal1] = useState<number | string>('');
    const [val2, setVal2] = useState<number | string>('');

    useEffect(() => {
        if (val1 === '' && val2 === '') {
            onChange(null);
            return;
        }

        const payload: NumberFilterPayload = {};
        const num1 = Number(val1);
        const num2 = Number(val2);

        if (!isNaN(num1) && val1 !== '') {
            if (mode === 'equals') payload.equal = num1;
            else if (mode === 'greater') payload.min = num1;
            else if (mode === 'less') payload.max = num1;
            else if (mode === 'between') {
                payload.min = num1;
                if (!isNaN(num2) && val2 !== '') {
                    payload.max = num2;
                }
            }
        }
        onChange(payload);
    }, [mode, val1, val2]);

    const clearFilter = () => {
        setVal1('');
        setVal2('');
        setMode('equals');
    };

    const ModeIcon = {
        equals: IconEqual,
        greater: IconMathGreater,
        less: IconMathLower,
        between: IconArrowsLeftRight
    }[mode];

    const filterMenu = (
        <Menu>
            <Menu.Target>
               <ActionIcon variant="transparent" color="dimmed" size="sm" aria-label="Select mode">
                    <ModeIcon style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Filter mode</Menu.Label>
                <Menu.Item 
                    leftSection={<IconEqual size={14} />} 
                    color={mode === 'equals' ? 'blue' : undefined}
                    onClick={() => setMode('equals')}
                >
                    Equals
                </Menu.Item>
                <Menu.Item 
                    leftSection={<IconMathGreater size={14} />} 
                    color={mode === 'greater' ? 'blue' : undefined}
                    onClick={() => setMode('greater')}
                >
                    Greater Than
                </Menu.Item>
                <Menu.Item 
                    leftSection={<IconMathLower size={14} />} 
                    color={mode === 'less' ? 'blue' : undefined}
                    onClick={() => setMode('less')}
                >
                    Less Than
                </Menu.Item>
                <Menu.Item 
                    leftSection={<IconArrowsLeftRight size={14} />} 
                    color={mode === 'between' ? 'blue' : undefined}
                    onClick={() => setMode('between')}
                >
                    Between
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )

    return (
        <Group gap="xs" align="flex-end" wrap="nowrap">
            <NumberInput
                label={label}
                placeholder={mode === 'between' ? "Min" : "e.g. 159"}
                value={val1}
                onChange={setVal1}
                leftSection={filterMenu}
                rightSection={
                    val1 !== '' ? (
                        <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={clearFilter}>
                            <IconX style={{ width: rem(14), height: rem(14) }} />
                        </ActionIcon>
                    ) : null
                }
                allowDecimal
                allowedDecimalSeparators={[',', '.']}
                w={mode === 'between' ? "48%" : "100%"}
            />
            
            {mode === 'between' && (
                <NumberInput
                    label="To"
                    placeholder="Max"
                    value={val2}
                    onChange={setVal2}
                    allowDecimal
                    allowedDecimalSeparators={[',', '.']}
                    w="48%"
                />
            )}
        </Group>
    );
}