import React from 'react';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Col, Form, Input, Row, Select} from 'antd';
import {GitService, IRepositoriesRequest} from "../service/GitService.ts";
import {Container} from "typescript-ioc";
import {useGitStore} from "../unLoad/GitStore.ts";


interface FormParams {
    githubToken: string;
    gitlabToken: string;
    repo: {
        type: 'Github' | 'Gitlab';
        url: string;
    }[]
}

export const GitForm: React.FC = () => {
    const [form] = Form.useForm();
    const gitService = Container.get(GitService);
    const {setRepositoryList} = useGitStore();

    const onFinish = (values: FormParams) => {
        console.log(values)
        gitService.getRepositoriesStatus(
            {
                repositories: {
                    gitlab: values.repo.filter(x => x.type === 'Gitlab').map(x => x.url),
                    github: values.repo.filter(x => x.type === 'Github').map(x => x.url)
                },
                githubToken: values.githubToken,
                gitlabToken: values.gitlabToken

            } as IRepositoriesRequest).then((response) => setRepositoryList(response));
        //
    };
    const handleChange = () => {
        form.setFieldsValue({sights: []});
    };

    return (<Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
                marginTop: 10,
                marginLeft: 50
            }}
            autoComplete="off"
        >
            <Row justify={"start"}>
                <Col span={11}><Form.Item
                    name="gitlabToken"
                >
                    <Input placeholder="Gitlab token" onChange={handleChange}/>
                </Form.Item></Col>
                <Col span={11} offset={2}><Form.Item
                    name="githubToken"
                >
                    <Input placeholder="Github token" onChange={handleChange}/>
                </Form.Item></Col>
            </Row>
            <Form.List name="repo">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(({key, name, ...restField}) => (
                            <>
                                <Row key={key} style={{display: 'flex', marginBottom: 8,}} gutter={12}>
                                    <Col span={6}><Form.Item
                                        {...restField}
                                        name={[name, 'type']}
                                        rules={[{required: true, message: 'Missing repo type'}]}
                                    >
                                        <Select
                                            placeholder="Git type"
                                            allowClear
                                            options={[{value: 'Github', label: 'Github'}, {
                                                value: 'Gitlab',
                                                label: 'Gitlab'
                                            }]}
                                        />
                                    </Form.Item></Col>
                                    <Col span={16}><Form.Item
                                        {...restField}
                                        name={[name, 'url']}
                                        rules={[{required: true, message: 'Missing repo url'}]}
                                    >
                                        <Input placeholder="Repositroy url" />
                                    </Form.Item></Col>
                                    <Col span={2}><MinusCircleOutlined onClick={() => remove(name)}/></Col>
                                </Row>
                            </>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};