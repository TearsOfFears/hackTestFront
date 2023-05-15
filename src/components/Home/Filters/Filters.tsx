import {
  MenuItem,
  Select,
  Checkbox,
  SelectChangeEvent,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@mui/material';
import React, { useState } from 'react';
// import Select from 'react-select';

import List from '../../../common/List';
import { useFindQuestionQuery } from '../../../redux/services/question';
import { useFindSubjectQuery } from '../../../redux/services/subject';
import { useFindQuery } from '../../../redux/services/university';
import Loader from '../../Loader';

import ItemFilter from './ItemFilter';

interface FiltersProps {
  setSubjectId: React.SetStateAction<string>;
}

function Filters({ setSubjectId }: FiltersProps): JSX.Element {
  const [universityId, setUniversityId] = useState<string>('');
  const [universityUser, setUniversityUser] = useState<string[]>([]);
  const { data, isLoading, error } = useFindQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const {
    data: subject,
    isLoading: isLoadingSubject,
    error: errorSubject,
  } = useFindSubjectQuery(universityId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleClickUniversity = (id) => {
    setUniversityId(id);
    setSubjectId('');
  };
  const handleClickSubject = (id: string) => setSubjectId(id);

  if (isLoading || isLoadingSubject) {
    return <Loader />;
  }
  const handleChange = (event: SelectChangeEvent<typeof universityUser>) => {
    const {
      target: { value },
    } = event;
    setUniversityUser(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <section className="flex flex-col">
      <List
        isLoading={isLoading}
        data={data}
        error={error}
        style="flex flex-row gap-4 border-b-2 pb-4 border-orange flex-wrap"
      >
        <div className="flex flex-row gap-4 justify-between items-center w-full">
          <div className="flex flex-row gap-4">
            {data.items.map((item) => (
              <ItemFilter
                title={item.title}
                id={item.universityId}
                handleOnClick={handleClickUniversity}
              />
            ))}
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 200 }} size="small">
              <InputLabel id="demo-multiple-name-label">
                Set subjects
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name-label"
                multiple
                value={universityUser}
                onChange={handleChange}
                renderValue={(selected) => {
                  const items = data.items;
                  if (selected.length > 2) {
                    return (
                      items
                        .filter(({ title, universityId }) => {
                          if (selected.includes(universityId)) {
                            return title;
                          }
                        })
                        .map(({ title }) => title)
                        .slice(0, 3)
                        .join(', ') + '...'
                    );
                  }
                  return items
                    .filter(({ title, universityId }) => {
                      if (selected.includes(universityId)) {
                        return title;
                      }
                    })
                    .map(({ title }) => title)
                    .join(', ');
                }}
                input={
                  <OutlinedInput label="Set subjects" sx={{ color: 'black' }} />
                }
              >
                {data.items.map(({ title, universityId }) => (
                  <MenuItem key={universityId} value={universityId}>
                    {/*<ListItemText primary={title} />*/}
                    <Checkbox
                      checked={universityUser.indexOf(universityId) > -1}
                    />
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </List>
      {universityId && (
        <List
          isLoading={isLoadingSubject}
          data={subject}
          error={errorSubject}
          id={universityId}
          style="flex flex-row gap-4 border-b-2 py-4 border-orange flex-wrap"
        >
          {subject.items.map((item) => (
            <ItemFilter
              title={item.title}
              id={item.subjectId}
              handleOnClick={handleClickSubject}
            />
          ))}
        </List>
      )}
    </section>
  );
}

export default Filters;
