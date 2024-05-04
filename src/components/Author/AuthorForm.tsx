'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { extractDefaults } from '@/libs/extractDefaults';
import { AddAuthorSchema } from '@/validations/AuthorValidation';

type IAuthorFormProps =
  | {
      edit: true;
      id: number;
      defaultValues: z.infer<typeof AddAuthorSchema>;
      handleStopEditing: () => void;
    }
  | { edit?: false };

const AuthorForm = (props: IAuthorFormProps) => {
  const form = useForm<z.infer<typeof AddAuthorSchema>>({
    resolver: zodResolver(AddAuthorSchema),
    defaultValues: props.edit ? props.defaultValues : extractDefaults(AddAuthorSchema),
  });
  const { handleSubmit, reset, setFocus } = form;
  const router = useRouter();

  const handleCreate = handleSubmit(async (data) => {
    if (props.edit) {
      await fetch(`/api/author`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: props.id,
          ...data,
        }),
      });

      props.handleStopEditing();
    } else {
      await fetch(`/api/author`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setFocus('name');
      reset();
    }

    router.refresh();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleCreate} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Author display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Language used.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export { AuthorForm };
