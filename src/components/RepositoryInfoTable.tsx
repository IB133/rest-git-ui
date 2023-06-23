import {FC} from 'react';
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {useRepoInfo} from "../unLoad/GitStore.ts";

interface RepositoryInfo {
    name: string;
    url: string;
    description: string;
    creation: string;
    contributorCount: number;
    contributors: string[];
}

const columns: ColumnsType<RepositoryInfo> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',

    },
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        render: (url) => <a href={url}>{url}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Creation Date',
        dataIndex: 'creation',
        key: 'creation',
    },
    {
        title: 'Contributors Count',
        dataIndex: 'contributorCount',
        key: 'contributorCount',
    },
    {
        title: 'Contributor Names',
        dataIndex: 'contributors',
        key: 'contributors',
    },
];


export const RepositoryInfoTable: FC = () => {
    const {repositoryInfo} = useRepoInfo();

    return (
        <Table columns={columns} dataSource={repositoryInfo} />
    )
};

