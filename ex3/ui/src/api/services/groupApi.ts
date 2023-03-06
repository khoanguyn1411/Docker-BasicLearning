import { composeQuery } from 'src/utils/composeQuery';

import { GroupDto } from '../dtos/groupDto';
import { NodesDto } from '../dtos/nodesDto';
import { ResponseDto } from '../dtos/responseDto';
import { http } from '../http';
import { groupMapper } from '../mappers/groupMapper';
import { nodesMapper } from '../mappers/nodesMapper';

/** Group queries. */
namespace GroupQueries {

  /** Get groups query. */
  export function getGroups() {
    return `
    query MyQuery {
      allGroups {
        nodes {
          id
          name
        }
      }
    }
  `;
  }
}

/** Group API. */
export namespace GroupApi {

  /** Get groups. */
  export async function getGroups(): Promise<readonly GroupDto[]> {
    const result = await http.post<ResponseDto<NodesDto<GroupDto, 'allGroups'>>>(
      '',
      composeQuery(GroupQueries.getGroups()),
    );
    return nodesMapper.fromDto(result.data, groupMapper, 'allGroups');
  }

}
