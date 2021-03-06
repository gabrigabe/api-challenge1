import { Client, Pagination } from '../interfaces';
import { getAge } from './getAge';

const clientSerializer = ({ id, full_name, gender, birthdate, location }: Client) => {
    const { city, state } = location;
    return {
        id,
        full_name,
        gender,
        birthdate,
        age: getAge(birthdate),
        location: {
            city,
            state
        }
    };
};

const allClientsserializer = ({ docs, limit, page, pages, totalDocs }: Pagination) => ({
    docs: docs.map(clientSerializer),
    limit,
    page,
    pages,
    totalDocs
});

export { clientSerializer, allClientsserializer };
