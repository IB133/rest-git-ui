import {FC} from 'react';
import {Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {useGitStore} from "../unLoad/GitStore.ts";

interface GitRepoStatusProps {
    key: string;
    url: string;
    type: 'Github' | 'Gitlab';
    status: 'Failure' | 'Success';
}

const columns: ColumnsType<GitRepoStatusProps> = [
    {
        title: 'Git',
        dataIndex: 'type',
        key: 'type',

    },
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        render: (url) => <a href={url}>{url}</a>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <>
                <Tag color={status === 'Success' ? 'green' : 'volcano'} key={status}>
                    {status.toUpperCase()}
                </Tag>
            </>
        ),
    },
];


export const GitTableResponse: FC = () => {
    const {repositoryList} = useGitStore();
    const datasource: GitRepoStatusProps[] = [];

    repositoryList.github?.failure.forEach(el => {
        datasource.push({
            url: el,
            type: 'Github',
            status: 'Failure',
            key: 'Github'
        })
    })
    repositoryList.github?.success.forEach(el => {
        datasource.push({
            url: el,
            type: 'Github',
            status: 'Success',
            key: 'Github'
        })
    })
    repositoryList.gitlab?.success.forEach(el => {
        datasource.push({
            url: el,
            type: 'Gitlab',
            status: 'Success',
            key: 'Gitlab'
        })
    })
    repositoryList.gitlab?.failure.forEach(el => {
        datasource.push({
            url: el,
            type: 'Gitlab',
            status: 'Failure',
            key: 'Gitlab'
        })
    })
    return (
        <Table columns={columns} dataSource={datasource}/>
    )
};

