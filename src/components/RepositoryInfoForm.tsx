import React from 'react';
import {Button, Form, Input} from 'antd';
import {Container} from "typescript-ioc";
import {GitService} from "../service/GitService.ts";
import {useRepoInfo} from "../unLoad/GitStore.ts";

interface IRepoName {
    repoName: string;
}


export const RepositoryInfoForm: React.FC = () => {
    const {setRepositoryInfo} = useRepoInfo();
    const onFinish = (values: IRepoName) => {
        console.log(values)
        const gitService = Container.get(GitService);
        gitService.getRepositoryInfo(values.repoName).then((response) => setRepositoryInfo(response));
    };

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            autoComplete="off"

        >
            <Form.Item
                label="Repo Name"
                name="repoName"
                rules={[{required: true, message: 'Please input repository name!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};