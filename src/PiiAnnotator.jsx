import React, { useState, useRef } from 'react';
import { Input, Select, Button, List, Divider, Typography, Space, Table, message, Flex, Row, Col, AutoComplete } from 'antd';
import './App.css';
import { DeleteFilled, DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

// Entity options from full_list.md, using Presidio Entity as value if available
const ENTITY_OPTIONS = [
    { label: 'Person', value: 'PERSON' },
    // { label: 'Name', value: 'PERSON' }, // duplicate value
    { label: 'Organization', value: 'ORGANIZATION' },
    { label: 'Phone Number', value: 'PHONE_NUMBER' },
    // { label: 'Mobile Phone Number', value: 'MOBILE_PHONE_NUMBER' }, // unique value
    // { label: 'Landline Phone Number', value: 'LANDLINE_PHONE_NUMBER' }, // unique value
    { label: 'Email', value: 'EMAIL_ADDRESS' },
    // { label: 'Email Address', value: 'EMAIL_ADDRESS' }, // duplicate value
    { label: 'Address', value: 'LOCATION' },
    // { label: 'Location', value: 'LOCATION' }, // duplicate value
    { label: 'IP Address', value: 'IP_ADDRESS' },
    { label: 'Passport Number', value: 'US_PASSPORT' },
    // { label: 'Passport_Number', value: 'US_PASSPORT' }, // duplicate value
    { label: 'Passport Expiration Date', value: 'DATE_TIME' },
    { label: 'Social Security Number', value: 'US_SSN' },
    // { label: 'Social_Security_Number', value: 'US_SSN' }, // duplicate value
    { label: 'National ID Number', value: 'IN_AADHAAR' },
    { label: 'Identity Card Number', value: 'IDENTITY_CARD_NUMBER' },
    { label: 'Identity Document Number', value: 'IDENTITY_DOCUMENT_NUMBER' },
    { label: 'National Health Insurance No.', value: 'NATIONAL_HEALTH_INSURANCE_NO' },
    { label: 'Health Insurance ID Number', value: 'HEALTH_INSURANCE_ID_NUMBER' },
    { label: 'Health Insurance Number', value: 'HEALTH_INSURANCE_NUMBER' },
    { label: 'Insurance Number', value: 'INSURANCE_NUMBER' },
    { label: 'Insurance Company', value: 'INSURANCE_COMPANY' },
    { label: 'CVC / CVV', value: 'CVC_CVV' },
    { label: 'Credit Card Number', value: 'CREDIT_CARD' },
    { label: 'Credit Card Expiration Date', value: 'DATE_TIME' },
    { label: 'Credit Card Brand', value: 'CREDIT_CARD_BRAND' },
    { label: 'Bank Account Number', value: 'US_BANK_NUMBER' },
    { label: 'IBAN', value: 'IBAN_CODE' },
    { label: 'Transaction Number', value: 'TRANSACTION_NUMBER' },
    { label: 'Tax Identification Number', value: 'US_ITIN' },
    { label: 'CPF', value: 'CPF' },
    { label: 'CNPJ', value: 'CNPJ' },
    { label: 'PAN', value: 'IN_PAN' },
    { label: 'Voter ID', value: 'IN_VOTER' },
    { label: "Driver's License Number", value: 'US_DRIVER_LICENSE' },
    { label: 'Vehicle Registration Number', value: 'IN_VEHICLE_REGISTRATION' },
    { label: 'License Plate Number', value: 'LICENSE_PLATE_NUMBER' },
    { label: 'AU Medicare', value: 'AU_MEDICARE' },
    { label: 'AU ABN', value: 'AU_ABN' },
    { label: 'AU ACN', value: 'AU_ACN' },
    { label: 'AU TFN', value: 'AU_TFN' },
    { label: 'UK NINO', value: 'UK_NINO' },
    { label: 'UK NHS', value: 'UK_NHS' },
    { label: 'SG NRIC/FIN', value: 'SG_NRIC_FIN' },
    // { label: 'US ITIN', value: 'US_ITIN' }, // duplicate value
    { label: 'Date of Birth', value: 'DATE_TIME' },
    { label: 'Medical License', value: 'MEDICAL_LICENSE' },
    { label: 'Medical Condition', value: 'MEDICAL_CONDITION' },
    { label: 'Medication', value: 'MEDICATION' },
    { label: 'URL', value: 'URL' },
    { label: 'Social Media Handle', value: 'SOCIAL_MEDIA_HANDLE' },
    { label: 'Username', value: 'USERNAME' },
    { label: 'Digital Signature', value: 'DIGITAL_SIGNATURE' },
    { label: 'Crypto Wallet Address', value: 'CRYPTO' },
    { label: 'Serial Number', value: 'SERIAL_NUMBER' },
    { label: 'Reservation Number', value: 'RESERVATION_NUMBER' },
    { label: 'Student ID Number', value: 'STUDENT_ID_NUMBER' },
    { label: 'Flight Number', value: 'FLIGHT_NUMBER' },
    { label: 'Train Ticket Number', value: 'TRAIN_TICKET_NUMBER' },
    { label: 'Birth Certificate Number', value: 'BIRTH_CERTIFICATE_NUMBER' },
    { label: 'NRP', value: 'NRP' },
    { label: 'UUID', value: 'UUID' },
    { label: 'Cluster UUID', value: 'CLUSTER_UUID' },
];

function PiiAnnotator() {
    const [msg, contextHolder] = message.useMessage();
    const [text, setText] = useState('');
    const [masterId, setMasterId] = useState('');
    const [textId, setTextId] = useState('');
    const [selection, setSelection] = useState(null);
    const [piiType, setPiiType] = useState(undefined);
    const [piis, setPiis] = useState([]);
    const [masterList, setMasterList] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('pii-master-list')) || [];
        } catch {
            return [];
        }
    });
    const [textIdOptions, setTextIdOptions] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('pii-textid-history')) || [];
        } catch {
            return [];
        }
    });
    const textAreaRef = useRef();

    // Handle text selection
    const handleSelect = (e) => {
        const el = e.target;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        if (start !== end) {
            setSelection({ start, end, text: text.slice(start, end) });
        } else {
            setSelection(null);
        }
        setPiiType(undefined);
    };

    // Add PII annotation
    const handleAddPii = () => {
        if (!selection || !piiType) return;
        setPiis([...piis, { ...selection, type: piiType }]);
        setSelection(null);
        setPiiType(undefined);
    };

    // Add to master list
    const handleAddToMaster = () => {
        if (!text.trim()) return;
        // Save textId to history if new
        if (textId && !textIdOptions.includes(textId)) {
            const updatedOptions = [...textIdOptions, textId];
            setTextIdOptions(updatedOptions);
            localStorage.setItem('pii-textid-history', JSON.stringify(updatedOptions));
        }
        const entry = { text, entites: [...piis], id: masterId, textId, uid: Date.now() };
        const updated = [...masterList, entry];
        setMasterList(updated);
        localStorage.setItem('pii-master-list', JSON.stringify(updated));
        setText('');
        setPiis([]);
        setSelection(null);
        setPiiType(undefined);
        setMasterId('');
        setTextId('');
        msg.success('Added to master list!');
    };

    // Download JSON
    const handleDownload = () => {
        const list = {};
        masterList.forEach(item => {
            if (!list[item.id]) {
                list[item.id] = { list: [] };
            }
            list[item.id].list.push({
                name: item.textId,
                text: item.text,
                entities: item.entites.map(ent => ({
                    text: ent.text,
                    type: ent.type,
                    start: ent.start,
                    end: ent.end
                }))
            });
        });
        const _masterList = Object.entries(list).map(([id, data]) => ({
            id,
            ...data
        }));
        const blob = new Blob([JSON.stringify(_masterList, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pii-master-list.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        setMasterList([]);
        localStorage.removeItem('pii-master-list');
        msg.success('Master list cleared!');
    };

    // Table columns for master list
    const columns = [
        { title: 'Id', dataIndex: 'id', key: 'id', fixed: 'left' },
        { title: 'Name', dataIndex: 'textId', key: 'textId', fixed: 'left' },
        {
            title: 'Text', dataIndex: 'text', key: 'text', width: '40%', render: (text) => (
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#f0f0f0', padding: 5 }}>{text}</pre>
            )
        },
        {
            title: 'Entities', dataIndex: 'entites', key: 'entites', render: (piis) => (
                <List
                    size="small"
                    dataSource={piis}
                    renderItem={item => (
                        <List.Item>
                            {item.word} <strong>({item.type})</strong> <Typography.Text type='danger'>[{item.start}-{item.end}]</Typography.Text>
                        </List.Item>
                    )}
                    locale={{ emptyText: 'No Entites added.' }}
                />
            )
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="dashed"
                        danger
                        icon={<DeleteFilled/>}
                        size="small"
                        onClick={() => {
                            const updated = masterList.filter(item => item.uid !== record.uid);
                            setMasterList(updated);
                            localStorage.setItem('pii-master-list', JSON.stringify(updated));
                            msg.success('Entry removed from master list!');
                        }}
                    />
                </Space>
            )
        },
    ];

    return (
        <>
            {contextHolder}
            <Row style={{ height: '100vh' }}>
                {/* Left Side: Input & PII for one text */}
                <Col span={10} style={{ borderRight: '1px solid #eee', padding: 24 }}>
                    <Flex vertical>
                        <Typography.Title level={4}>Text Input & PII Annotation</Typography.Title>
                        <TextArea
                            ref={textAreaRef}
                            rows={8}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            onSelect={handleSelect}
                            placeholder="Paste or type your text here..."
                        />
                        <Space style={{ margin: '16px 0' }}>
                            <span>Selected: <b>{selection ? selection.text : '-'}</b></span>
                            <Select
                                showSearch
                                optionFilterProp="children"
                                value={piiType}
                                onChange={setPiiType}
                                placeholder="Select Entity type"
                                disabled={!selection}
                                style={{ width: 240 }}
                            >
                                {ENTITY_OPTIONS.map(opt => (
                                    <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                                ))}
                            </Select>
                            <Button 
                            type="primary" onClick={handleAddPii} disabled={!selection || !piiType}>Add</Button>
                        </Space>
                        <Divider orientation="left">Added Enities</Divider>
                        <List
                            size="small"
                            style={{ maxHeight: 200, overflowY: 'auto', background: '#f9f9f9', padding: 8 }}
                            dataSource={piis}
                            renderItem={item => (
                                <List.Item style={{ textAlign: 'left' }}>
                                    <pre>{item.text} <strong>({item.type})</strong> [{item.start}-{item.end}]</pre>
                                </List.Item>
                            )}
                            locale={{ emptyText: 'No PII added yet.' }}
                        />
                        <Flex justify='space-between' style={{ marginTop: 16 }} gap={16}>
                            <Flex vertical gap={8} flex={1}>
                                <Flex style={{ width: '100%' }} justify='space-around' align='center' gap={8}>
                                    <Typography.Text strong>Master Id:</Typography.Text>
                                    <Input
                                        value={masterId}
                                        onChange={e => setMasterId(e.target.value)}
                                        placeholder="e.g Case ID, Document ID, etc."
                                        style={{ width: 250 }}
                                    />
                                </Flex>
                                <Flex style={{ width: '100%' }} justify='space-around' align='center' gap={8}>
                                    <Typography.Text strong>Name of the text:</Typography.Text>
                                    <AutoComplete
                                        value={textId}
                                        options={textIdOptions.map(opt => ({ value: opt }))}
                                        onChange={setTextId}
                                        onSelect={setTextId}
                                        placeholder="e.g Subject, Email, etc."
                                        style={{ width: 250 }}
                                        filterOption={(inputValue, option) =>
                                            option.value.toLowerCase().includes(inputValue.toLowerCase())
                                        }
                                        allowClear
                                    />
                                </Flex>
                            </Flex>
                            <Button 
                            type="primary" 
                            onClick={handleAddToMaster} disabled={!text.trim() || !masterId.trim()}>Add to Master List <DoubleRightOutlined /></Button>
                        </Flex>
                    </Flex></Col>
                {/* Right Side: Master List */}
                <Col span={14} style={{ padding: 24 }}>
                    <Flex style={{ paddingLeft: 24 }} vertical>
                        <Flex justify="space-between" style={{ marginBottom: 16 }}>
                            <Typography.Title level={4}>Master List ({masterList.length})</Typography.Title>
                            <Space>
                                <Button
                                    desabled={masterList.length === 0}
                                    type='primary'
                                    onClick={handleDownload} style={{ marginBottom: 16 }}>Download JSON</Button>
                                <Button
                                    danger
                                    disabled={masterList.length === 0}
                                    onClick={handleClear} style={{ marginBottom: 16 }}>Clear</Button>
                            </Space>
                        </Flex>
                        <Table
                            style={{ width: '100%' }}
                            sticky
                            columns={columns}
                            dataSource={masterList.map((item, i) => ({ ...item, key: i }))}
                            pagination={{ pageSize: 5 }}
                            scroll={{ x: 'max-content' }}
                        />
                    </Flex>
                </Col>
            </Row>
        </>
    );
}

export default PiiAnnotator;
